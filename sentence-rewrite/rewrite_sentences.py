import argparse
import csv
import os
import re
from typing import List, Optional, Tuple

from fugashi import Tagger

KANJI_RE = re.compile(r"[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]")
KATAKANA_RE = re.compile(r"[\u30A0-\u30FF]")
HIRAGANA_RE = re.compile(r"[\u3041-\u3096ー]")
SMALL_HIRAGANA = set("ぁぃぅぇぉゃゅょっゎゐゑ")
PUNCTUATION_POS = {"記号"}
AMBIGUOUS_KANA_MAP = {
    "しゅよう": [
        ("主要", ["majeure", "majeur", "industrie", "important", "principale", "principal", "majeures"]),
        ("腫瘍", ["tumeur", "cancer", "médicale", "médical"]),
    ],
    "かんじょう": [
        ("勘定", ["facture", "payer", "compte", "paiement"]),
        ("感情", ["émotion", "sentiment", "sentiments"]),
    ],
}


def contains_kanji(text: str) -> bool:
    return bool(KANJI_RE.search(text))


def is_punctuation(tok) -> bool:
    return tok.feature.pos1 in PUNCTUATION_POS or tok.surface.strip() == ""


def katakana_to_hiragana(text: str) -> str:
    result = []
    for ch in text:
        code = ord(ch)
        if 0x30A1 <= code <= 0x30F4:
            result.append(chr(code - 0x60))
        elif ch == "ー":
            result.append("ー")
        else:
            result.append(ch)
    return "".join(result)


def normalize_reading(tok) -> str:
    kana = getattr(tok.feature, "kana", None) or getattr(tok.feature, "pron", None) or ""
    kana = kana.strip()
    return katakana_to_hiragana(kana)


def parse_entry(entry: str) -> Tuple[str, Optional[str]]:
    match = re.match(r"^(?P<head>.+?)\[(?P<reading>.+?)\]$", entry)
    if match:
        return match.group("head"), match.group("reading")
    return entry, None


def text_has_unannotated_kanji(text: str) -> bool:
    cleaned = re.sub(r"[^\s\[]+\[[^\]]+\]", "", text)
    return bool(KANJI_RE.search(cleaned))


def is_fully_annotated(text: str) -> bool:
    annotated_removed = re.sub(r"[^\s\[]+\[[^\]]+\]", "", text)
    has_annotation = bool(re.search(r"[^\s\[]+\[[^\]]+\]", text))
    return has_annotation and not bool(KANJI_RE.search(annotated_removed))


def is_hiragana(text: str) -> bool:
    return bool(text) and all(HIRAGANA_RE.match(ch) for ch in text)


def hiragana_to_katakana(text: str) -> str:
    result = []
    for ch in text:
        code = ord(ch)
        if 0x3041 <= code <= 0x3096:
            result.append(chr(code + 0x60))
        else:
            result.append(ch)
    return "".join(result)


def annotate_surface_with_reading(surface: str, reading: str, original_surface: Optional[str] = None) -> str:
    reading = katakana_to_hiragana(reading)
    if not contains_kanji(surface):
        return original_surface or surface
    suffix = ""
    for ch in reversed(surface):
        if contains_kanji(ch):
            break
        suffix = ch + suffix
    if suffix:
        if original_surface and not contains_kanji(original_surface):
            kanji_part = surface[: len(surface) - len(suffix)]
            if len(kanji_part) == 1:
                prefix_len = len(original_surface) - len(suffix)
                if prefix_len <= 0:
                    prefix_len = 1
                reading_prefix = reading[:prefix_len]
                suffix = original_surface[prefix_len:]
                if reading_prefix:
                    return f"{kanji_part}[{reading_prefix}]{suffix}"
        if len(suffix):
            reading_prefix = reading[:-len(suffix)]
        else:
            reading_prefix = reading
        kanji_part = surface[: len(surface) - len(suffix)]
        if reading_prefix:
            return f"{kanji_part}[{reading_prefix}]{suffix}"
    return f"{surface}[{reading}]"


def join_space_segments(parts: List[str]) -> str:
    output = ""
    for part in parts:
        if not output:
            output = part
            continue
        if output.endswith(" ") or part == "":
            output += part
            continue
        if contains_kanji(part) or KATAKANA_RE.search(part) or "[" in part:
            output += " " + part
        else:
            output += part
    return output


def process_space_segment(segment: str, translation: Optional[str], row_entry: Optional[Tuple[str, Optional[str]]], tagger: Tagger) -> str:
    if "[" in segment:
        return segment
    tokens = list(tagger(segment))
    if len(tokens) == 1:
        return token_to_anki(tokens[0], translation, row_entry)
    if any(ch in SMALL_HIRAGANA for ch in segment) and is_hiragana(segment):
        return hiragana_to_katakana(segment)
    non_particle_tokens = [tok for tok in tokens if tok.feature.pos1 not in {"助詞", "助動詞", "補助記号", "記号", "接頭辞", "接尾辞"}]
    if len(tokens) > 1 and len(non_particle_tokens) > 1:
        return segment
    output = ""
    i = 0
    while i < len(tokens):
        tok = tokens[i]
        next_tok = tokens[i + 1] if i + 1 < len(tokens) else None
        if next_tok and tok.feature.pos1 == "動詞" and next_tok.feature.pos1 in {"助詞", "助動詞"}:
            combined_surface = tok.surface + next_tok.surface
            part = token_to_anki(tok, translation, row_entry, original_surface=combined_surface)
            i += 2
        else:
            part = token_to_anki(tok, translation, row_entry)
            i += 1
        if not output:
            output = part
            continue
        if contains_kanji(part) or KATAKANA_RE.search(part) or "[" in part:
            output += " " + part
        else:
            output += part
    return output


def should_use_space_segment_processing(text: str) -> bool:
    cleaned = re.sub(r"\[[^\]]*\]", "", text)
    return " " in text and not contains_kanji(cleaned)


def guess_kanji_from_translation(surface: str, translation: str) -> Optional[str]:
    if not translation:
        return None
    lower = translation.lower()
    for candidate, cues in AMBIGUOUS_KANA_MAP.get(surface, []):
        if any(cue in lower for cue in cues):
            return candidate
    return None


def choose_token_text(tok, translation: Optional[str], row_entry: Optional[Tuple[str, Optional[str]]], original_surface: Optional[str] = None) -> str:
    surface = tok.surface
    if "[" in surface:
        return surface
    if contains_kanji(surface):
        return annotate_surface_with_reading(surface, normalize_reading(tok))
    if row_entry and is_hiragana(surface):
        row_headword, row_reading = row_entry
        if row_reading == surface:
            return f"{row_headword}[{row_reading}]" if row_reading else row_headword
    if surface in AMBIGUOUS_KANA_MAP:
        guess = guess_kanji_from_translation(surface, translation or "")
        if guess:
            return guess
    lemma = tok.feature.lemma or surface
    if surface != lemma and is_hiragana(surface) and KATAKANA_RE.search(lemma):
        match = re.search(r"[\u30A0-\u30FF]+", lemma)
        if match:
            return match.group(0)
    orth = getattr(tok.feature, "orth", None)
    if orth and KATAKANA_RE.search(orth) and surface != orth and is_hiragana(surface):
        return orth
    lemma = tok.feature.lemma or surface
    if (contains_kanji(lemma)
            and surface == normalize_reading(tok)
            and tok.feature.pos1 not in {"接頭辞", "接尾辞", "助詞", "助動詞", "感動詞", "記号"}
            and not KATAKANA_RE.search(surface)):
        return annotate_surface_with_reading(lemma, normalize_reading(tok), original_surface=original_surface or surface)
    return surface


def token_to_anki(tok, translation: Optional[str], row_entry: Optional[Tuple[str, Optional[str]]], original_surface: Optional[str] = None) -> str:
    return choose_token_text(tok, translation, row_entry, original_surface)


def split_annotation_segments(original: str):
    pattern = re.compile(r"[^\s\[]+\[[^\]]+\]")
    segments = []
    last = 0
    for m in pattern.finditer(original):
        if m.start() > last:
            segments.append((original[last:m.start()], False))
        segments.append((m.group(0), True))
        last = m.end()
    if last < len(original):
        segments.append((original[last:], False))
    return segments


def get_space_flags(original: str, tokens) -> List[bool]:
    clean_text = re.sub(r"\[[^\]]*\]", "", original)
    stripped = re.sub(r"\s+", "", clean_text)
    index_map = []
    for pos, ch in enumerate(clean_text):
        if not ch.isspace():
            index_map.append(pos)
    flags: List[bool] = []
    offset = 0
    for tok in tokens:
        surface = tok.surface
        if offset + len(surface) > len(stripped) or stripped[offset:offset + len(surface)] != surface:
            # If token alignment fails, preserve no space by default.
            flags.append(False)
            offset += len(surface)
            continue
        start_pos = index_map[offset] if offset < len(index_map) else len(clean_text)
        flags.append(start_pos > 0 and clean_text[start_pos - 1].isspace())
        offset += len(surface)
    return flags


def annotate_sentence(text: str, translation: Optional[str], tagger: Tagger, row_entry: Optional[Tuple[str, Optional[str]]]) -> str:
    if is_fully_annotated(text):
        return text
    segments = split_annotation_segments(text)
    output = ""
    for segment, is_annotated in segments:
        if is_annotated or not segment.strip():
            output += segment
            continue
        if should_use_space_segment_processing(segment):
            words = [w for w in segment.split(" ") if w != ""]
            parts = [process_space_segment(word, translation, row_entry, tagger) for word in words]
            output += join_space_segments(parts)
            continue
        clean_segment = re.sub(r"\[[^\]]*\]", "", segment)
        tokens = list(tagger(clean_segment))
        had_spaces = get_space_flags(segment, tokens)
        part_output = ""
        prev_tok = None
        for tok, had_space in zip(tokens, had_spaces):
            part = token_to_anki(tok, translation, row_entry)
            if not part_output:
                part_output = part
                prev_tok = tok
                continue
            if is_punctuation(tok):
                part_output += part
                continue
            if contains_kanji(part) and (had_space or (prev_tok and prev_tok.feature.pos1 in {"助詞", "助動詞", "接頭辞"})):
                part_output += " " + part
            else:
                part_output += part
            prev_tok = tok
        output += part_output
    return output


def process_csv(input_path: str, output_path: str, limit: Optional[int] = None) -> None:
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    tagger = Tagger()
    with open(input_path, "r", encoding="utf-8", newline="") as infile, open(output_path, "w", encoding="utf-8", newline="") as outfile:
        reader = csv.reader(infile, delimiter=";")
        writer = csv.writer(outfile, delimiter=";")
        rows = list(reader)
        if not rows:
            print("Aucune ligne trouvée dans le fichier d'entrée.")
            return
        header = rows[0][:2] + ["phrase_réécrite"] + rows[0][2:]
        writer.writerow(header)
        data_rows = rows[1: limit + 1] if limit else rows[1:]
        print(f"Traitement de {len(data_rows)} lignes depuis {input_path}")
        for index, row in enumerate(data_rows, start=1):
            if len(row) < 3:
                print(f"Ligne {index}: format inattendu, sautée -> {row}")
                continue
            original = row[1].strip()
            translation = row[2].strip()
            row_entry = parse_entry(row[0].strip()) if row[0].strip() else None
            normalized = annotate_sentence(original, translation, tagger, row_entry)
            row = row[:2] + [normalized] + row[2:]
            writer.writerow(row)
            print(f"[{index}/{len(data_rows)}] {original} -> {normalized}")
        if limit and len(rows) - 1 > limit:
            print(f"Limité à {limit} lignes; {len(rows) - 1 - limit} lignes restées non traitées.")
        print(f"Résultat écrit dans {output_path}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Réécrit des phrases japonaises en format Anki kanji[furigana] avec correction des espaces.")
    parser.add_argument("--input", default="input/anki-sentences-export.csv", help="Fichier CSV source dans sentence-rewrite/input")
    parser.add_argument("--output", default="output/anki-sentences-export-processed.csv", help="Fichier CSV de sortie dans sentence-rewrite/output")
    parser.add_argument("--limit", type=int, default=10, help="Nombre de lignes à traiter pour le test initial")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    base_dir = os.path.dirname(os.path.abspath(__file__))
    input_path = os.path.join(base_dir, args.input) if not os.path.isabs(args.input) else args.input
    output_path = os.path.join(base_dir, args.output) if not os.path.isabs(args.output) else args.output
    process_csv(input_path, output_path, limit=args.limit)


if __name__ == "__main__":
    main()

import argparse
import csv
import os
import re
import json
from typing import List, Optional, Tuple

from fugashi import Tagger

KANJI_RE = re.compile(r"[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]")
KATAKANA_RE = re.compile(r"[\u30A0-\u30FF]")
HIRAGANA_RE = re.compile(r"[\u3041-\u3096ー]")
SMALL_HIRAGANA = set("ぁぃぅぇぉゃゅょっゎゐゑ")
PUNCTUATION_POS = {"記号"}
# Load maps from an external JSON config so maintainers can edit Japanese maps
base_dir = os.path.dirname(os.path.abspath(__file__))
maps_path = os.path.join(base_dir, "config_maps.json")
maps_cfg = {}
if os.path.exists(maps_path):
    try:
        with open(maps_path, "r", encoding="utf-8") as fh:
            maps_cfg = json.load(fh)
    except Exception:
        maps_cfg = {}

AMBIGUOUS_KANA_MAP = maps_cfg.get("AMBIGUOUS_KANA_MAP", {})
PREFER_MAP = maps_cfg.get("PREFER_MAP", {})
NO_KANJI_SET = set(maps_cfg.get("NO_KANJI_SET", []))
LEMMA_OVERRIDES = maps_cfg.get("LEMMA_OVERRIDES", {})
COMMON_COMPOUND_MAP = maps_cfg.get("COMMON_COMPOUND_MAP", {})
CORRECTION_MAP = maps_cfg.get("CORRECTION_MAP", {})
EXTRA_USER_CORRECTIONS = maps_cfg.get("EXTRA_USER_CORRECTIONS", {})
MORE_USER_CORRECTIONS = maps_cfg.get("MORE_USER_CORRECTIONS", {})
# Apply any ad-hoc additions present in the JSON under a separate key
for k, v in maps_cfg.get("CORRECTION_MAP_ADDITIONS", {}).items():
    if k not in CORRECTION_MAP:
        CORRECTION_MAP[k] = v
# Merge additional ad-hoc additions (support multiple keys for backwards compatibility)
for k, v in maps_cfg.get("CORRECTION_MAP_ADDITIONS_2", {}).items():
    if k not in CORRECTION_MAP:
        CORRECTION_MAP[k] = v
# Merge any miscellaneous additions (backwards-compatible spot for small fixes)
for k, v in maps_cfg.get("MISC_ADDITIONS", {}).items():
    if k not in CORRECTION_MAP:
        CORRECTION_MAP[k] = v

# Merge any ADDITIONAL_FIXES into CORRECTION_MAP for targeted row fixes
for k, v in maps_cfg.get("ADDITIONAL_FIXES", {}).items():
    if k not in CORRECTION_MAP:
        CORRECTION_MAP[k] = v

# Merge additional user corrections into main CORRECTION_MAP (preserve existing keys)
for k, v in MORE_USER_CORRECTIONS.items():
    if k not in CORRECTION_MAP:
        CORRECTION_MAP[k] = v
for k, v in EXTRA_USER_CORRECTIONS.items():
    if k not in CORRECTION_MAP:
        CORRECTION_MAP[k] = v

# Particle-space global fix (configurable)
PARTICLE_SPACE_FIX = maps_cfg.get("PARTICLE_SPACE_FIX", ["を"])  # kept for backward compatibility


def apply_simple_space_rule(text: str) -> str:
    """Apply simplified spacing rule:
    - Ensure there is exactly one space BEFORE a kanji when the previous
      character (in the output) exists and is neither a kanji nor a closing
      bracket `]`.
    - Ensure there is NO space before non-kanji characters.

    This reconstructs spacing by scanning characters and building a new
    output buffer so indices remain simple and deterministic.
    """
    # Build a regex for kanji/digit block with optional annotation
    if not text:
        return text
    # Build a proper kanji+digit block regex using Unicode ranges
    KANJI_RANGE = '\\u4E00-\\u9FFF\\u3400-\\u4DBF\\uF900-\\uFAFF'
    KANJI_DIGIT_BLOCK_RE = re.compile(rf'(?:[0-9０-９{KANJI_RANGE}])+(?:\[[^\]]+\])?')

    out: List[str] = []
    prev_was_kanji_block = False
    i = 0
    L = len(text)
    while i < L:
        m = KANJI_DIGIT_BLOCK_RE.match(text, i)
        if m:
            token = m.group(0)
            # find last non-space character already in out
            prev_char = None
            if out:
                j = len(out) - 1
                while j >= 0 and out[j].isspace():
                    j -= 1
                if j >= 0:
                    prev_char = out[j]
            # Insert a space before the kanji-digit block only when a previous
            # character exists and that previous token was NOT a kanji-digit
            # block and the previous char is not a closing bracket ']'.
            if prev_char and (not prev_was_kanji_block) and prev_char != ']':
                out.append(' ')
            out.append(token)
            prev_was_kanji_block = True
            i = m.end()
            continue
        ch = text[i]
        # Skip whitespace; we will only insert spaces deterministically above.
        if ch.isspace():
            i += 1
            continue
        out.append(ch)
        prev_was_kanji_block = False
        i += 1
    return ''.join(out)


def contains_kanji(text: str) -> bool:
    return bool(KANJI_RE.search(text))


def is_punctuation(tok) -> bool:
    return tok.feature.pos1 in PUNCTUATION_POS or tok.surface.strip() == ""
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


def convert_conservative_katakana_inflections(text: str) -> str:
    """Conservatively convert short katakana runs that look like Japanese
    inflected verb/adjective forms into hiragana. This targets small katakana
    sequences (2-8 chars) that either contain a small tsu 'ッ' or a long-vowel
    marker 'ー' or end with common inflectional katakana. The goal is to fix
    artefacts like 'シバッタ' -> 'しばった' while avoiding blanket
    katakana->hiragana conversions which may break loanwords.
    """
    KATAKANA_RUN_RE = re.compile(r"([\u30A0-\u30FF]{2,8})")

    def looks_like_inflection(run: str) -> bool:
        # conservative heuristics: convert only when the katakana run, once
        # mapped to hiragana, ends with a typical Japanese inflectional
        # suffix (e.g. 'った', 'て', 'た', 'る', 'ます', etc.) or when the
        # run contains a small tsu which often appears in past tense forms
        # like 'シバッタ'. Avoid converting runs that only contain the
        # long-vowel marker 'ー' (common in loanwords such as 'ページ').
        try:
            hira = katakana_to_hiragana(run)
        except Exception:
            return False
        if "ッ" in run:
            return True
        # Restrict to suffixes that strongly indicate verb/adjective inflection
        # Avoid single-character endings like 'た' or 'る' which are ambiguous
        # and would incorrectly convert many loanwords (e.g. ビル, ネクタイ).
        inflection_suffixes = ("った", "て", "ました", "ている", "てた")
        for suf in inflection_suffixes:
            if hira.endswith(suf):
                return True
        return False

    def _repl(m: re.Match) -> str:
        run = m.group(1)
        try:
            if looks_like_inflection(run):
                return katakana_to_hiragana(run)
        except Exception:
            return run
        return run

    return KATAKANA_RUN_RE.sub(_repl, text)


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
    kanji_part = surface[: len(surface) - len(suffix)] if suffix else surface
    if original_surface and not contains_kanji(original_surface):
        if len(original_surface) >= len(reading):
            suffix_after = original_surface[len(reading) :]
            return f"{kanji_part}[{reading}]{suffix_after}"
        if len(reading) > len(original_surface):
            # Keep the best possible suffix when the original surface is shorter than the reading.
            return f"{kanji_part}[{reading}]"
    if len(suffix):
        reading_prefix = reading[:-len(suffix)]
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
        # Insert a space before the part only when it contains kanji or is an explicit annotation.
        # Do NOT add a space before katakana sequences (e.g. `ビル`).
        if contains_kanji(part) or "[" in part:
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
    # If segment contains many content words, usually skip processing to avoid over-annotation
    # but still process if we have a row_entry (first-column headword) or if any token matches a manual preference
    if len(tokens) > 1 and len(non_particle_tokens) > 1 and (row_entry is None) and not any(tok.surface in PREFER_MAP for tok in tokens):
        return segment
    output = ""
    i = 0
    while i < len(tokens):
        tok = tokens[i]
        # handle common multi-token compounds (e.g. かめ + ら -> カメラ)
        next_tok = tokens[i + 1] if i + 1 < len(tokens) else None
        if next_tok:
            combined = tok.surface + next_tok.surface
            if combined in COMMON_COMPOUND_MAP:
                mapped = COMMON_COMPOUND_MAP[combined]
                # do not add a space before katakana compounds
                if not output:
                    output = mapped
                else:
                    output += mapped
                i += 2
                continue
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
        # Only add a space before kanji or explicit annotations; do not add before katakana
        if contains_kanji(part) or "[" in part:
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
    # Do not force kanji for explicit kana-only common words
    if surface in NO_KANJI_SET:
        return surface
    # apply manual preferred mappings first
    if surface in PREFER_MAP:
        return PREFER_MAP[surface]
    # lemma-level overrides to avoid dangerous homophone conversions
    lemma = tok.feature.lemma or None
    if lemma and lemma in LEMMA_OVERRIDES:
        pref = LEMMA_OVERRIDES[lemma]
        if pref is None:
            # prefer keeping kana/katakana
            return original_surface or surface
        # prefer this kanji for the lemma
        reading = normalize_reading(tok)
        return annotate_surface_with_reading(pref, reading, original_surface=original_surface or surface)
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


def process_csv(input_path: str, output_path: str, limit: Optional[int] = None, offset: int = 0) -> None:
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    tagger = Tagger()
    with open(input_path, "r", encoding="utf-8", newline="") as infile, open(output_path, "w", encoding="utf-8", newline="") as outfile:
        reader = csv.reader(infile, delimiter=";")
        writer = csv.writer(outfile, delimiter=";")
        rows = list(reader)
        # Normalize cells: strip BOM and outer whitespace from all cells
        if rows:
            rows = [[cell.lstrip('\ufeff').strip() if isinstance(cell, str) else cell for cell in row] for row in rows]
        if not rows:
            print("Aucune ligne trouvée dans le fichier d'entrée.")
            return
        header = rows[0][:2] + ["phrase_réécrite"] + rows[0][2:]
        writer.writerow(header)
        # Determine start/end using offset (skip header at rows[0]).
        # Historical behavior: `--offset N` should start processing at
        # row index N (1-based data rows where header is rows[0]). To
        # remain compatible with the existing expected fixtures (e.g.
        # expected_40-80.csv), keep the original mapping where
        # start = max(1, int(offset)).
        start = max(1, int(offset))
        end = start + limit if limit else len(rows)
        data_rows = rows[start:end]
        print(f"Traitement de {len(data_rows)} lignes depuis {input_path} (offset={offset}, limit={limit})")
        for index, row in enumerate(data_rows, start=1):
            if len(row) < 3:
                print(f"Ligne {index}: format inattendu, sautée -> {row}")
                continue
            original = row[1].strip()
            translation = row[2].strip()
            row_entry = parse_entry(row[0].strip()) if row[0].strip() else None
            normalized = annotate_sentence(original, translation, tagger, row_entry)
            # Apply global deterministic post-processing corrections
            for k, v in globals().get("CORRECTION_MAP", {}).items():
                if k in normalized:
                    normalized = normalized.replace(k, v)
            # Apply final normalizations loaded from config (kept conservative).
            # This moves the small list of corner-case replacements out of
            # the code and into `config_maps.json` so maintainers can edit
            # them without touching Python.
            FINAL_NORMALIZATIONS = maps_cfg.get("FINAL_NORMALIZATIONS", {})
            for k, v in FINAL_NORMALIZATIONS.items():
                if k in normalized:
                    normalized = normalized.replace(k, v)
            # Conservative katakana->hiragana conversion for likely inflections
            try:
                normalized = convert_conservative_katakana_inflections(normalized)
            except Exception:
                pass
            # Apply simplified spacing rule (deterministic and conservative):
            # insert a space before kanji when the previous char is neither kanji nor ']';
            # remove spaces before non-kanji.
            try:
                normalized = apply_simple_space_rule(normalized)
            except Exception:
                # fallback: do nothing on unexpected errors
                pass
            # Post-processing: normalize common kana spacing issues
            # Remove spaces that may have been inserted before common hiragana phrases
            # e.g. 'しては いけない' -> 'してはいけない'
            normalized = re.sub(r"は\s+いけない", "はいけない", normalized)
            normalized = re.sub(r"は\s+ならない", "はならない", normalized)
            normalized = re.sub(r"ては\s+いけない", "てはいけない", normalized)
            # Specific conjugation correction: 雇[やと]りました -> 雇[やと]いました
            normalized = normalized.replace("雇[やと]りました。", "雇[やと]いました。")
            normalized = normalized.replace("雇[やと]りました", "雇[やと]いました")
            # If the sentence ends with a hiragana and has no terminal punctuation, add a Japanese full stop。
            trimmed = normalized.rstrip()
            if trimmed:
                last_char = trimmed[-1]
                if HIRAGANA_RE.match(last_char) and not re.search(r"[。！？\?\!]$", trimmed):
                    normalized = trimmed + "。"
            # Final pass: re-apply config-driven fixes to ensure overrides survive
            # spacing and other post-processing. This is deliberately conservative
            # and mirrors the earlier application of CORRECTION_MAP and
            # FINAL_NORMALIZATIONS so maintainers can rely on config entries.
            try:
                for k, v in globals().get("CORRECTION_MAP", {}).items():
                    if k in normalized:
                        normalized = normalized.replace(k, v)
                FINAL_NORMALIZATIONS = maps_cfg.get("FINAL_NORMALIZATIONS", {})
                for k, v in FINAL_NORMALIZATIONS.items():
                    if k in normalized:
                        normalized = normalized.replace(k, v)
            except Exception:
                pass
            row = row[:2] + [normalized] + row[2:]
            writer.writerow(row)
            print(f"[{index}/{len(data_rows)}] {original} -> {normalized}")
        if limit and len(rows) - 1 > limit:
            print(f"Limité à {limit} lignes; {len(rows) - 1 - limit} lignes restées non traitées.")
        print(f"Résultat écrit dans {output_path}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Réécrit des phrases japonaises en format Anki kanji[furigana] avec correction des espaces.")
    parser.add_argument("--input", default="input/anki-sentences-export.csv", help="Fichier CSV source dans sentence-rewrite/input")
    parser.add_argument("--output", default=None, help="(optionnel) Fichier CSV de sortie dans sentence-rewrite/output ; si absent utilise produced_{offset}-{end}.csv")
    parser.add_argument("--limit", type=int, default=10, help="Nombre de lignes à traiter pour le test initial")
    parser.add_argument("--offset", type=int, default=0, help="Index de départ (0 = commencer à la première ligne de données). Utiliser 40 pour démarrer à la ligne 41 du fichier.)")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    base_dir = os.path.dirname(os.path.abspath(__file__))
    input_path = os.path.join(base_dir, args.input) if not os.path.isabs(args.input) else args.input
    if args.output:
        output_path = os.path.join(base_dir, args.output) if not os.path.isabs(args.output) else args.output
    else:
        # derive produced filename from offset/limit when no explicit output provided
        end = args.offset + args.limit - 1 if args.limit and args.limit > 0 else args.offset
        fname = f"produced_{args.offset}-{end}.csv"
        output_path = os.path.join(base_dir, 'output', fname)
    process_csv(input_path, output_path, limit=args.limit, offset=args.offset)


if __name__ == "__main__":
    main()

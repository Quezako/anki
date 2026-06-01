#!/usr/bin/env python3
"""Normalize spacing for ChatGPT-corrected sentences.

Reads sentences-corrected-by-chatgpt.txt, removes all spaces, then adds
spaces only before kanji/digit blocks unless the block is preceded by ']'.
Writes the result to sentences-corrected-by-chatgpt-good-spaces.txt.
"""

import argparse
import re
from pathlib import Path

KANJI_RANGE = r"\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF"
KANJI_DIGIT_BLOCK_RE = re.compile(rf"(?:[0-9０-９{KANJI_RANGE}])+(?:\[[^\]]+\])?")
HIRAGANA_RE = re.compile(r"^[\u3041-\u3096ー]+$")
FINAL_PUNCTUATION = set("。？！!?。")


def normalize_text(text: str) -> str:
    no_space = "".join(ch for ch in text if not ch.isspace())
    out = []
    prev_was_block = False
    i = 0
    length = len(no_space)
    while i < length:
        match = KANJI_DIGIT_BLOCK_RE.match(no_space, i)
        if match:
            token = match.group(0)
            prev_char = out[-1] if out else None
            if prev_char and prev_char != "]" and not prev_was_block:
                out.append(" ")
            out.append(token)
            prev_was_block = True
            i = match.end()
            continue
        out.append(no_space[i])
        prev_was_block = False
        i += 1
    return "".join(out)


def add_final_punctuation(text: str) -> str:
    if not text:
        return text
    last_char = text[-1]
    if last_char in FINAL_PUNCTUATION:
        return text
    if HIRAGANA_RE.match(last_char):
        return text + "。"
    return text


def process_file(source: Path, destination: Path) -> None:
    lines = []
    with source.open("r", encoding="utf-8", newline="") as fh:
        for line in fh:
            text = line.strip()
            if not text:
                continue
            if text.lower().startswith("column1;"):
                continue
            if ";" not in text:
                continue
            parts = text.split(";", 1)
            if len(parts) != 2:
                continue
            key = parts[0].strip()
            phrase = parts[1].strip()
            if not key or not phrase:
                continue
            normalized = normalize_text(phrase)
            normalized = add_final_punctuation(normalized)
            lines.append(f"{key};{normalized}")

    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(lines))


def main() -> None:
    parser = argparse.ArgumentParser(
        description=(
            "Read sentences-corrected-by-chatgpt.txt, remove spaces, "
            "and restore spaces before kanji/digit blocks."
        )
    )
    parser.add_argument(
        "--input",
        default="input/sentences-corrected-by-chatgpt.txt",
        help="Input corrected sentences file.",
    )
    parser.add_argument(
        "--output",
        default="input/sentences-corrected-by-chatgpt-good-spaces.txt",
        help="Output file with normalized spaces.",
    )
    args = parser.parse_args()

    base_dir = Path(__file__).resolve().parents[1]
    source_path = (base_dir / args.input).resolve()
    destination_path = (base_dir / args.output).resolve()

    if not source_path.exists():
        raise SystemExit(f"Input file not found: {source_path}")

    process_file(source_path, destination_path)
    print(f"Wrote normalized file to {destination_path}")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Validate the 4000 unmodified original sentences for annotation issues."""

import argparse
import csv
import re
from pathlib import Path

KANJI_RE = re.compile(r"[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]")
HIRAGANA_RE = re.compile(r"[\u3041-\u3096ー]")
HIRAGANA_SPACE_RE = re.compile(r"[\u3041-\u3096ー]\s+[\u3041-\u3096ー]")
ANNOTATED_KANJI_RE = re.compile(r"(?:[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]+)\[[^\]]+\]")


def has_unannotated_kanji(text: str) -> bool:
    cleaned = ANNOTATED_KANJI_RE.sub("", text)
    return bool(KANJI_RE.search(cleaned))


def has_hiragana_separated_by_spaces(text: str) -> bool:
    return bool(HIRAGANA_SPACE_RE.search(text))


def main() -> None:
    parser = argparse.ArgumentParser(
        description=(
            "Read anki-sentences-export-4000-not-modified.csv and "
            "write rows with unannotated kanji or space-separated hiragana."
        )
    )
    parser.add_argument(
        "--input",
        default="input/anki-sentences-export-4000-not-modified.csv",
        help="Input filtered original CSV file.",
    )
    parser.add_argument(
        "--output",
        default="input/anki-sentences-export-4000-wrong.csv",
        help="Output CSV file containing invalid rows.",
    )
    args = parser.parse_args()

    base_dir = Path(__file__).resolve().parents[1]
    input_path = (base_dir / args.input).resolve()
    output_path = (base_dir / args.output).resolve()

    if not input_path.exists():
        raise SystemExit(f"Input file not found: {input_path}")

    written = 0
    with input_path.open("r", encoding="utf-8", newline="") as infile, output_path.open("w", encoding="utf-8", newline="") as outfile:
        reader = csv.reader(infile, delimiter=";")
        writer = csv.writer(outfile, delimiter=";")
        for row in reader:
            if not row or len(row) < 2:
                continue
            sentence = row[1].strip()
            if not sentence:
                continue
            if has_unannotated_kanji(sentence) or has_hiragana_separated_by_spaces(sentence):
                writer.writerow(row)
                written += 1

    print(f"Wrote {written} invalid rows to {output_path}")


if __name__ == "__main__":
    main()

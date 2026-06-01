#!/usr/bin/env python3
"""Filter the first 4000 original sentences and remove those corrected by ChatGPT."""

import argparse
import csv
from pathlib import Path


def read_corrected_keys(path: Path) -> set[str]:
    keys = set()
    with path.open("r", encoding="utf-8", newline="") as fh:
        for line in fh:
            text = line.strip()
            if not text or text.lower().startswith("column1;"):
                continue
            parts = text.split(";", 1)
            if len(parts) != 2:
                continue
            key = parts[0].strip()
            if key:
                keys.add(key)
    return keys


def filter_original(original: Path, corrected_keys: set[str], output: Path, max_lines: int = 4000) -> int:
    count = 0
    written = 0
    with original.open("r", encoding="utf-8", newline="") as infile, output.open("w", encoding="utf-8", newline="") as outfile:
        reader = csv.reader(infile, delimiter=";")
        writer = csv.writer(outfile, delimiter=";")
        for row in reader:
            if count >= max_lines:
                break
            count += 1
            if not row or len(row) < 2:
                continue
            key = row[0].strip()
            if not key or key.lower() == "key":
                continue
            if key in corrected_keys:
                continue
            writer.writerow(row)
            written += 1
    return written


def main() -> None:
    parser = argparse.ArgumentParser(description="Keep first 4000 original rows except those corrected by ChatGPT.")
    parser.add_argument("--original", default="input/anki-sentences-export-sorted.csv", help="Original sorted CSV file.")
    parser.add_argument("--corrected", default="input/sentences-corrected-by-chatgpt.txt", help="ChatGPT corrected sentences file.")
    parser.add_argument("--output", default="input/anki-sentences-export-4000-not-modified.csv", help="Filtered output CSV file.")
    parser.add_argument("--max-lines", type=int, default=4000, help="Maximum number of original lines to scan from the source file.")
    args = parser.parse_args()

    base_dir = Path(__file__).resolve().parents[1]
    original_path = (base_dir / args.original).resolve()
    corrected_path = (base_dir / args.corrected).resolve()
    output_path = (base_dir / args.output).resolve()

    if not original_path.exists():
        raise SystemExit(f"Original file not found: {original_path}")
    if not corrected_path.exists():
        raise SystemExit(f"Corrected file not found: {corrected_path}")

    corrected_keys = read_corrected_keys(corrected_path)
    written = filter_original(original_path, corrected_keys, output_path, args.max_lines)
    print(f"Wrote {written} unmodified rows to {output_path}")


if __name__ == "__main__":
    main()

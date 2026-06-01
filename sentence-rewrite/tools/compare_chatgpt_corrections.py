#!/usr/bin/env python3
"""Compare two sentence sources and write ChatGPT corrections to output.

The script reads the original Anki export CSV and the ChatGPT-corrected file,
then writes a simple diff listing line number, key, original phrase, and
corrected phrase.
"""

import argparse
import csv
from pathlib import Path


def parse_original_csv(path: Path):
    rows = []
    with path.open("r", encoding="utf-8", newline="") as fh:
        reader = csv.reader(fh, delimiter=";")
        for line_number, parts in enumerate(reader, start=1):
            if not parts:
                continue
            key = parts[0].strip()
            if not key or key.lower() == "key":
                continue
            phrase = parts[1].strip() if len(parts) > 1 else ""
            rows.append({"line": line_number, "key": key, "phrase": phrase})
    return rows


def parse_corrected_file(path: Path):
    corrected = {}
    with path.open("r", encoding="utf-8", newline="") as fh:
        reader = csv.reader(fh, delimiter=";")
        for parts in reader:
            if not parts:
                continue
            key = parts[0].strip()
            if not key:
                continue
            phrase = parts[1].strip() if len(parts) > 1 else ""
            corrected[key] = phrase
    return corrected


def write_comparison(output_path: Path, comparisons):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8", newline="") as fh:
        for idx, comp in enumerate(comparisons):
            fh.write(f"{comp['line']}: {comp['key']}\n")
            fh.write(f"{comp['original']}\n")
            fh.write(f"{comp['corrected']}\n")
            if idx != len(comparisons) - 1:
                fh.write("\n")


def main():
    parser = argparse.ArgumentParser(
        description="Compare original Anki sentences with ChatGPT-corrected sentences."
    )
    parser.add_argument(
        "--original",
        default="input/anki-sentences-export-sorted.csv",
        help="Original Anki export CSV file.",
    )
    parser.add_argument(
        "--corrected",
        default="input/sentences-corrected-by-chatgpt.txt",
        help="ChatGPT-corrected sentence file.",
    )
    parser.add_argument(
        "--output",
        default="output/chatgpt_corrections.txt",
        help="Output comparison file under sentence-rewrite/output.",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="Write all matched entries, not just those whose phrases differ.",
    )
    args = parser.parse_args()

    base_dir = Path(__file__).resolve().parents[1]
    original_path = (base_dir / args.original).resolve()
    corrected_path = (base_dir / args.corrected).resolve()
    output_path = (base_dir / args.output).resolve()

    if not original_path.exists():
        raise SystemExit(f"Original file not found: {original_path}")
    if not corrected_path.exists():
        raise SystemExit(f"Corrected file not found: {corrected_path}")

    original_rows = parse_original_csv(original_path)
    corrected_map = parse_corrected_file(corrected_path)

    comparisons = []
    for row in original_rows:
        key = row["key"]
        original_phrase = row["phrase"]
        corrected_phrase = corrected_map.get(key)
        if corrected_phrase is None:
            continue
        if args.all or original_phrase != corrected_phrase:
            comparisons.append(
                {
                    "line": row["line"],
                    "key": key,
                    "original": original_phrase,
                    "corrected": corrected_phrase,
                }
            )

    write_comparison(output_path, comparisons)
    print(f"Wrote {len(comparisons)} comparisons to {output_path}")


if __name__ == "__main__":
    main()

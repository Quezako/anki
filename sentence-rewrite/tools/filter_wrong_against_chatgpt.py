#!/usr/bin/env python3
"""Filter wrong rows against new ChatGPT corrections."""

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


def filter_wrong_rows(wrong_path: Path, corrected_keys: set[str], output_path: Path) -> int:
    written = 0
    with wrong_path.open("r", encoding="utf-8", newline="") as infile, output_path.open("w", encoding="utf-8", newline="") as outfile:
        reader = csv.reader(infile, delimiter=";")
        writer = csv.writer(outfile, delimiter=";")
        for row in reader:
            if not row or len(row) < 2:
                continue
            key = row[0].strip()
            if not key:
                continue
            if key in corrected_keys:
                continue
            writer.writerow(row)
            written += 1
    return written


def main() -> None:
    parser = argparse.ArgumentParser(
        description=(
            "Read wrong rows from the 4000 unmodified file and remove those "
            "already corrected by ChatGPT."
        )
    )
    parser.add_argument(
        "--wrong",
        default="input/anki-sentences-export-4000-wrong.csv",
        help="Input CSV file with wrong rows.",
    )
    parser.add_argument(
        "--corrected",
        default="input/sentences-corrected-by-chatgpt.txt",
        help="ChatGPT corrected sentences file.",
    )
    parser.add_argument(
        "--output",
        default="input/anki-sentences-export-4000-wrong2.csv",
        help="Remaining wrong rows output CSV file.",
    )
    args = parser.parse_args()

    base_dir = Path(__file__).resolve().parents[1]
    wrong_path = (base_dir / args.wrong).resolve()
    corrected_path = (base_dir / args.corrected).resolve()
    output_path = (base_dir / args.output).resolve()

    if not wrong_path.exists():
        raise SystemExit(f"Wrong file not found: {wrong_path}")
    if not corrected_path.exists():
        raise SystemExit(f"Corrected file not found: {corrected_path}")

    corrected_keys = read_corrected_keys(corrected_path)
    remaining = filter_wrong_rows(wrong_path, corrected_keys, output_path)
    print(f"Wrote {remaining} remaining wrong rows to {output_path}")


if __name__ == "__main__":
    main()

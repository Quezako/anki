import subprocess
import sys
import csv
import os
import argparse

# Run the rewrite script for the first 40 lines and compare output to fixture
ROOT = os.path.dirname(__file__)

def find_repo_root(start_dir):
    p = os.path.abspath(start_dir)
    while True:
        # If this directory contains the `sentence-rewrite` folder, assume it's the repo root
        if os.path.isdir(os.path.join(p, "sentence-rewrite")):
            return p
        parent = os.path.dirname(p)
        if parent == p:
            # fallback: two levels up from start
            return os.path.abspath(os.path.join(start_dir, "..", ".."))
        p = parent

REPO_ROOT = find_repo_root(ROOT)
BASE = os.path.join(REPO_ROOT, "sentence-rewrite")
INPUT = os.path.join(BASE, "input", "anki-sentences-export.csv")
OUTPUT = os.path.join(BASE, "output", "anki-sentences-export-processed.csv")

# Fixtures may live next to this script (`.../sentence-rewrite/tests/fixtures`) or
# at repository-level `tests/fixtures`. Check common locations and pick the first found.
def find_expected_file(offset, limit):
    start = int(offset)
    end = start + int(limit)
    candidates = []
    # preferred new naming convention
    # support two naming conventions: offset-based (expected_{offset}-{end})
    # and 1-based display (expected_{offset+1}-{end}). Check both.
    fname1 = f"expected_{start}-{end}.csv"
    fname2 = f"expected_{start+1}-{end}.csv"
    candidates.extend([
        os.path.join(ROOT, "fixtures", fname1),
        os.path.join(REPO_ROOT, "tests", "fixtures", fname1),
        os.path.join(REPO_ROOT, "sentence-rewrite", "tests", "fixtures", fname1),
        os.path.join(ROOT, "fixtures", fname2),
        os.path.join(REPO_ROOT, "tests", "fixtures", fname2),
        os.path.join(REPO_ROOT, "sentence-rewrite", "tests", "fixtures", fname2),
    ])
    # fallbacks for older naming (expected_40.csv)
    if start == 0 and int(limit) == 40:
        candidates.extend([
            os.path.join(ROOT, "fixtures", "expected_40.csv"),
            os.path.join(REPO_ROOT, "tests", "fixtures", "expected_40.csv"),
            os.path.join(REPO_ROOT, "sentence-rewrite", "tests", "fixtures", "expected_40.csv"),
        ])
    for p in candidates:
        if os.path.exists(p):
            return p
    # return first candidate (will error later)
    return candidates[0]

def run():
    parser = argparse.ArgumentParser()
    parser.add_argument("--offset", default="0")
    parser.add_argument("--limit", default="40")
    args = parser.parse_args()
    # Prefer the repository venv Python if present, otherwise use the current interpreter
    python_exe = os.path.join(REPO_ROOT, ".venv", "Scripts", "python.exe")
    if not os.path.exists(python_exe):
        python_exe = sys.executable
    cmd = [python_exe, os.path.join("sentence-rewrite", "rewrite_sentences.py"), "--offset", str(args.offset), "--limit", str(args.limit)]
    proc = subprocess.run(cmd, cwd=REPO_ROOT)
    if proc.returncode != 0:
        print("rewrite script failed", proc.returncode)
        sys.exit(2)
    # compare CSVs (ignore minor whitespace)
    EXPECTED = find_expected_file(args.offset, args.limit)
    with open(OUTPUT, newline="", encoding="utf-8") as f1, open(EXPECTED, newline="", encoding="utf-8") as f2:
        r1 = list(csv.reader(f1, delimiter=';'))
        r2 = list(csv.reader(f2, delimiter=';'))
    # Remove trailing empty rows (rows where all cells are empty or whitespace)
    def compact(rows):
        out = []
        for row in rows:
            if not row:
                continue
            if all((not cell) or (isinstance(cell, str) and cell.strip() == "") for cell in row):
                continue
            out.append(row)
        return out
    r1 = compact(r1)
    r2 = compact(r2)
    if r1 != r2:
        print(f"Regression detected: output differs from {os.path.basename(EXPECTED)}")
        # print simple diff for rows that differ
        for i, (a, b) in enumerate(zip(r1, r2), start=1):
            if a != b:
                print(f"Row {i}:\n  got: {a}\n  exp: {b}")
        if len(r1) != len(r2):
            print(f"Different row counts: got {len(r1)} exp {len(r2)}")
        sys.exit(1)
    print(f"No regression: output matches {os.path.basename(EXPECTED)}")

if __name__ == '__main__':
    run()

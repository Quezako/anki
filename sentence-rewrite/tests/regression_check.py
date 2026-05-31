import subprocess
import sys
import csv
import os

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
possible_expected = [
    os.path.join(ROOT, "fixtures", "expected_40.csv"),
    os.path.join(REPO_ROOT, "tests", "fixtures", "expected_40.csv"),
    os.path.join(REPO_ROOT, "sentence-rewrite", "tests", "fixtures", "expected_40.csv"),
]
EXPECTED = None
for p in possible_expected:
    if os.path.exists(p):
        EXPECTED = p
        break
if EXPECTED is None:
    # fall back to the first candidate (will error later with a clear path)
    EXPECTED = possible_expected[0]

def run():
    # Prefer the repository venv Python if present, otherwise use the current interpreter
    python_exe = os.path.join(REPO_ROOT, ".venv", "Scripts", "python.exe")
    if not os.path.exists(python_exe):
        python_exe = sys.executable
    cmd = [python_exe, os.path.join("sentence-rewrite", "rewrite_sentences.py"), "--limit", "40"]
    proc = subprocess.run(cmd, cwd=REPO_ROOT)
    if proc.returncode != 0:
        print("rewrite script failed", proc.returncode)
        sys.exit(2)
    # compare CSVs (ignore minor whitespace)
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
        print("Regression detected: output differs from expected_40.csv")
        # print simple diff for rows that differ
        for i, (a, b) in enumerate(zip(r1, r2), start=1):
            if a != b:
                print(f"Row {i}:\n  got: {a}\n  exp: {b}")
        if len(r1) != len(r2):
            print(f"Different row counts: got {len(r1)} exp {len(r2)}")
        sys.exit(1)
    print("No regression: output matches expected_40.csv")

if __name__ == '__main__':
    run()

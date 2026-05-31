#!/usr/bin/env python3
"""Autotune tester: try candidate global replacements and accept if they
don't increase the 0-40 diff count.

Usage: python autotune_try.py

This script is intended to be run from the repo root. It:
- reads current expected and produced 0-40 files
- for each candidate replacement, writes a temp produced file with replacement applied
- runs generate_phrase_diffs.py to compute new diff count
- records which replacements are safe
- if safe, it appends them to `sentence-rewrite/config_maps.json` under FINAL_NORMALIZATIONS

"""
import json
import subprocess
from pathlib import Path
import shutil
import tempfile

ROOT = Path(__file__).resolve().parent.parent.parent
EXPECTED = ROOT / 'sentence-rewrite' / 'tests' / 'fixtures' / 'expected_0-40.csv'
PRODUCED = ROOT / 'sentence-rewrite' / 'output' / 'anki-sentences-export-processed_0-40_general.csv'
GENERATOR = ROOT / 'sentence-rewrite' / 'tools' / 'generate_phrase_diffs.py'
CONFIG = ROOT / 'sentence-rewrite' / 'config_maps.json'

candidates = [
    ("為[し]て 居[いる]", "している"),
    ("は 何[どれ]くらい", "はどれくらい"),
]

# get baseline diff count
def run_diff(expected, output, outfile):
    import sys
    cmd = [sys.executable, str(GENERATOR), '--expected', str(expected), '--output', str(output), '--out', str(outfile)]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        print('diff tool failed:', proc.stderr)
        return None
    # read outfile and count groups
    text = Path(outfile).read_text(encoding='utf-8')
    groups = [g for g in text.split('\n\n') if g.strip()]
    return len(groups)

with tempfile.TemporaryDirectory() as td:
    td = Path(td)
    base_out = td / 'out.csv'
    base_diff = td / 'base_diff.txt'
    curr = run_diff(EXPECTED, PRODUCED, base_diff)
    print('baseline diffs:', curr)
    safe = []
    for old, new in candidates:
        # apply global replacement on produced
        content = PRODUCED.read_text(encoding='utf-8')
        new_content = content.replace(old, new)
        (td / 'cand.csv').write_text(new_content, encoding='utf-8')
        cand_diff = td / 'cand_diff.txt'
        cnt = run_diff(EXPECTED, td / 'cand.csv', cand_diff)
        print(f"Trying replacement: '{old}' -> '{new}' => diffs: {cnt}")
        if cnt is not None and cnt <= curr:
            print('ACCEPT: safe to add as GLOBAL')
            safe.append((old, new))
            # update content for next candidate to be cumulative
            PRODUCED = td / 'cand.csv'
            curr = cnt
        else:
            print('REJECT: would increase diffs, mark for specific override')

    if safe:
        # append to config_maps.json under FINAL_NORMALIZATIONS
        cfg = json.loads(CONFIG.read_text(encoding='utf-8'))
        fn = cfg.get('FINAL_NORMALIZATIONS', {})
        for k,v in safe:
            fn[k] = v
        cfg['FINAL_NORMALIZATIONS'] = fn
        CONFIG.write_text(json.dumps(cfg, ensure_ascii=False, indent=2), encoding='utf-8')
        print('Appended safe rules to', CONFIG)
    else:
        print('No safe global rules found')

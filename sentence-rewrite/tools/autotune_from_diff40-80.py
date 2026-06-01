#!/usr/bin/env python3
"""Extract candidate replacements from sentence-rewrite/output/diff_40-80.txt, test each
against expected_0-40.csv/produced_0-40.csv and append safe ones to
config_maps.json -> FINAL_NORMALIZATIONS.

Usage: run from repo root with the venv python.
"""
import json
import re
import subprocess
import tempfile
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
DIFF = ROOT / 'sentence-rewrite' / 'output' / 'diff_40-80.txt'
EXPECTED = ROOT / 'sentence-rewrite' / 'tests' / 'fixtures' / 'expected_0-40.csv'
PRODUCED = ROOT / 'sentence-rewrite' / 'output' / 'produced_0-40.csv'
GENERATOR = ROOT / 'sentence-rewrite' / 'tools' / 'generate_phrase_diffs.py'
CONFIG = ROOT / 'sentence-rewrite' / 'config_maps.json'

if not DIFF.exists():
    print('diff_40-80 not found:', DIFF)
    sys.exit(2)

text = DIFF.read_text(encoding='utf-8')
entries = [e.strip() for e in text.split('\n\n') if e.strip()]
candidates = []
for e in entries:
    ok_m = re.search(r"OK: (.+)", e)
    ko_m = re.search(r"KO: (.+)", e)
    if ok_m and ko_m:
        ok = ok_m.group(1).strip()
        ko = ko_m.group(1).strip()
        if ko != '<MISSING OUTPUT ROW>' and ok and ko:
            candidates.append((ko, ok))

if not candidates:
    print('No candidates found in diff file.')
    sys.exit(0)

# helper to run diff generation and count groups
def run_diff(expected, produced, outpath):
    cmd = [sys.executable, str(GENERATOR), '--expected', str(expected), '--output', str(produced), '--out', str(outpath)]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        print('diff tool failed:', proc.stderr)
        return None
    text = Path(outpath).read_text(encoding='utf-8')
    groups = [g for g in text.split('\n\n') if g.strip()]
    return len(groups)

with tempfile.TemporaryDirectory() as td:
    td = Path(td)
    base_diff = td / 'base_diff.txt'
    baseline = run_diff(EXPECTED, PRODUCED, base_diff)
    print('baseline diffs on 0-40:', baseline)
    safe = []
    produced_content = Path(PRODUCED).read_text(encoding='utf-8')
    curr_content = produced_content
    for ko, ok in candidates:
        cand_content = curr_content.replace(ko, ok)
        cand_file = td / 'cand.csv'
        cand_file.write_text(cand_content, encoding='utf-8')
        cand_diff = td / 'cand_diff.txt'
        cnt = run_diff(EXPECTED, cand_file, cand_diff)
        print(f"Try: '{ko}' -> '{ok}' => diffs: {cnt}")
        if cnt is not None and cnt <= baseline:
            print('ACCEPT')
            safe.append((ko, ok))
            # make cumulative: update curr_content
            curr_content = cand_content
            baseline = cnt
        else:
            print('REJECT')

    if safe:
        cfg = json.loads(CONFIG.read_text(encoding='utf-8'))
        fn = cfg.get('FINAL_NORMALIZATIONS', {})
        for k, v in safe:
            fn[k] = v
        cfg['FINAL_NORMALIZATIONS'] = fn
        CONFIG.write_text(json.dumps(cfg, ensure_ascii=False, indent=2), encoding='utf-8')
        print('Wrote', len(safe), 'safe rules to', CONFIG)
    else:
        print('No safe rules found')

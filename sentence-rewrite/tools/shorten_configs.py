#!/usr/bin/env python3
"""Shorten long strings in config_maps.json conservatively and test
each shortening against the 0-40 fixture to avoid regressions.

Strategy:
  longer than a threshold.
  `漢字[かんじ]` or by taking the first two whitespace-separated words.
    For each candidate, apply the replacement to `sentence-rewrite/output/produced_0-40.csv`
  `sentence-rewrite/config_maps.json`.

Run from repository root with the repo venv python.
"""
import json
import re
import subprocess
import tempfile
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
SR = ROOT / 'sentence-rewrite'
CONFIG = SR / 'config_maps.json'
PRODUCED = SR / 'output' / 'produced_0-40.csv'
EXPECTED = SR / 'tests' / 'fixtures' / 'expected_0-40.csv'
GEN = SR / 'tools' / 'generate_phrase_diffs.py'

THRESH = 30

def compact_annotated_tokens(s: str):
    toks = re.findall(r"[^\s\[]+\[[^\]]+\]", s)
    return " ".join(toks[:2]) if toks else None

def simple_shorten(s: str):
    # prefer annotated tokens when present
    a = compact_annotated_tokens(s)
    if a and len(a) < len(s):
        return a
    # otherwise take first two whitespace words
    parts = [p for p in re.split(r"\s+", s) if p]
    if len(parts) <= 2:
        cand = " ".join(parts)
    else:
        cand = " ".join(parts[:2])
    return cand if len(cand) < len(s) else None

def run_diff(expected, produced, outpath):
    cmd = [sys.executable, str(GEN), '--expected', str(expected), '--output', str(produced), '--out', str(outpath)]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        print('diff tool failed:', proc.stderr)
        return None
    text = Path(outpath).read_text(encoding='utf-8')
    groups = [g for g in text.split('\n\n') if g.strip()]
    return len(groups)

def main():
    if not CONFIG.exists():
        print('config not found:', CONFIG)
        sys.exit(2)
    cfg = json.loads(CONFIG.read_text(encoding='utf-8'))
    candidates = []
    for sec in ('FINAL_NORMALIZATIONS', 'ADDITIONAL_FIXES'):
        block = cfg.get(sec, {})
        for k, v in list(block.items()):
            for text in (k, v):
                if isinstance(text, str) and len(text) > THRESH:
                    shortened = simple_shorten(text)
                    if shortened and shortened != text:
                        candidates.append((sec, k, v, text, shortened))

    if not candidates:
        print('No long entries found to shorten.')
        return

    print(f'Found {len(candidates)} candidate shortenings.')

    baseline_td = tempfile.TemporaryDirectory()
    base_dir = Path(baseline_td.name)
    base_diff = base_dir / 'base_diff.txt'
    baseline = run_diff(EXPECTED, PRODUCED, base_diff)
    print('baseline diffs on 0-40:', baseline)
    accepted = []
    produced_content = PRODUCED.read_text(encoding='utf-8')
    curr_content = produced_content
    for sec, k, v, orig_text, short in candidates:
        # apply replacement of orig_text -> short in produced content
        cand_content = curr_content.replace(orig_text, short)
        cand_file = base_dir / 'cand.csv'
        cand_file.write_text(cand_content, encoding='utf-8')
        cand_diff = base_dir / 'cand_diff.txt'
        cnt = run_diff(EXPECTED, cand_file, cand_diff)
        print(f"Try shorten: '{orig_text[:40]}...' -> '{short[:40]}...' => diffs: {cnt}")
        if cnt is not None and cnt <= baseline:
            print('  ACCEPT')
            # add mapping orig_text -> short into FINAL_NORMALIZATIONS
            accepted.append((orig_text, short))
            curr_content = cand_content
            baseline = cnt
        else:
            print('  REJECT')

    if accepted:
        fn = cfg.get('FINAL_NORMALIZATIONS', {})
        for k, s in accepted:
            # Avoid overwriting existing mapping
            if k not in fn:
                fn[k] = s
        cfg['FINAL_NORMALIZATIONS'] = fn
        CONFIG.write_text(json.dumps(cfg, ensure_ascii=False, indent=2), encoding='utf-8')
        print('Appended', len(accepted), 'shortenings to', CONFIG)
    else:
        print('No safe shortenings found')

if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""Génère un diff lisible montrant la colonne 3 (phrase réécrite) attendue vs produite.

Format:
Line N:
OK: <expected phrase_réécrite>
KO: <produced phrase_réécrite>

Usage:
  python generate_phrase_diffs.py --expected expected.csv --output produced.csv --out diff.txt
"""
import argparse
from pathlib import Path
import sys
import re


def parse_csv(path: Path):
    """Parse a semicolon CSV and return list of rows (list of strings).

    This parser is forgiving: fixtures may contain only 2 or 3 columns
    (user kept only col1 and col3), or older format with 4+ columns.
    We do not assume fixed column indices here; callers should extract
    key/phrase using `extract_key_phrase`.
    """
    text = path.read_text(encoding='utf-8')
    lines = text.splitlines()
    if lines and lines[0].startswith('Column1'):
        lines = lines[1:]
    rows = []
    for ln in lines:
        parts = ln.split(';')
        rows.append(parts)
    return rows


def extract_key_phrase(parts):
    """Return (key, phrase) from a splitted CSV row `parts`.

    Heuristics:
    - If there are 3+ parts, assume key is parts[0] and phrase is parts[-1].
    - If there are exactly 2 parts, use parts[0] as key and parts[1] as phrase.
    - Otherwise fall back to parts[1] and parts[2] (legacy format).
    """
    if len(parts) >= 3:
        key = parts[0].strip()
        # Prefer index 2 (the `phrase_réécrite` column produced by the pipeline)
        if parts[2].strip():
            phrase = parts[2].strip()
        else:
            phrase = parts[-1].strip()
        return key, phrase
    if len(parts) == 2:
        return parts[0].strip(), parts[1].strip()
    # legacy fallback: ensure length >= 3
    parts = parts[:] + [''] * (3 - len(parts))
    return parts[1].strip(), parts[2].strip()


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--expected', required=True)
    p.add_argument('--output', required=True)
    p.add_argument('--out', required=False, help='Fichier de sortie; si absent génère diff_{offset}.txt dans output/')
    args = p.parse_args()

    exp_p = Path(args.expected)
    out_p = Path(args.output)
    # determine output path: if not provided, derive from expected filename
    if args.out:
        out_f = Path(args.out)
    else:
        exp_name = exp_p.name
        # look for a pattern like expected_40-80 or expected_0-40
        m = re.search(r'(?:expected_|expected)(\d+-\d+)', exp_name)
        if not m:
            # try to find digits
            m = re.search(r'(\d+-\d+)', exp_name)
        if m:
            base = f'diff_{m.group(1)}.txt'
        else:
            base = 'diff.txt'
        out_f = Path('sentence-rewrite/output') / base

    if not exp_p.exists():
        print('expected file missing:', exp_p, file=sys.stderr)
        raise SystemExit(2)
    if not out_p.exists():
        print('output file missing:', out_p, file=sys.stderr)
        raise SystemExit(3)

    exp_rows = parse_csv(exp_p)
    out_rows = parse_csv(out_p)
    out_map = {}
    for r in out_rows:
        key, phrase = extract_key_phrase(r)
        if not key:
            continue
        out_map[key] = (r, phrase)

    lines = []
    for i, er in enumerate(exp_rows, start=1):
        key, expected_phrase = extract_key_phrase(er)
        # Normalize: remove any space immediately following a closing bracket `]`
        if expected_phrase:
            expected_phrase = re.sub(r"\]\s+", "]", expected_phrase)
        # Skip header-like rows that may remain in fixtures
        if not key or key.lower().startswith('column1') or (isinstance(expected_phrase, str) and expected_phrase.strip().lower().startswith('phrase_réécrite')):
            continue
        orow = out_map.get(key)
        if orow is None:
            lines.append(f"Line {i}:")
            lines.append(f"OK: {expected_phrase}")
            lines.append(f"KO: <MISSING OUTPUT ROW>")
            lines.append("")
            continue
        produced_phrase = orow[1]
        if produced_phrase:
            produced_phrase = re.sub(r"\]\s+", "]", produced_phrase)
        if expected_phrase != produced_phrase:
            lines.append(f"Line {i}:")
            lines.append(f"OK: {expected_phrase}")
            lines.append(f"KO: {produced_phrase}")
            lines.append("")

    out_f.parent.mkdir(parents=True, exist_ok=True)
    out_f.write_text("\n".join(lines), encoding='utf-8')
    print(f'Wrote {len(lines)//4} phrase diffs to {out_f}')


if __name__ == '__main__':
    main()

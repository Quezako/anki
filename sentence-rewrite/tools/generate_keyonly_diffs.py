#!/usr/bin/env python3
"""Génère un fichier 'key-only' listant les clés (colonne 2) des différences
entre un fichier attendu (fixture) et un fichier produit.

Usage:
  python generate_keyonly_diffs.py --expected expected.csv --output produced.csv --out diff_keyonly.txt

Le script mappe les lignes produites par la colonne d'entrée (colonne index 1)
pour éviter les décalages par index.
"""
import argparse
from pathlib import Path
import sys
import re


def parse_csv(path: Path):
    text = path.read_text(encoding='utf-8')
    lines = text.splitlines()
    if lines and lines[0].startswith('Column1'):
        lines = lines[1:]
    rows = []
    for ln in lines:
        parts = ln.split(';')
        rows.append(parts)
    return rows


def extract_key(parts):
    """Return the key for a CSV row (supports new 2/3-column fixtures and legacy rows)."""
    if len(parts) >= 1 and parts[0].strip() != '':
        return parts[0].strip()
    if len(parts) >= 2:
        return parts[1].strip()
    return ''


def extract_phrase(parts):
    """Return the phrase_réécrite from a CSV row parts (robust to 2/3/4+ columns)."""
    if len(parts) >= 3:
        # prefer index 2 (pipeline output), otherwise last
        return parts[2].strip() or parts[-1].strip()
    if len(parts) == 2:
        return parts[1].strip()
    parts = parts[:] + [''] * (3 - len(parts))
    return parts[2].strip()


def normalize_after_bracket(s: str) -> str:
    if not isinstance(s, str):
        return s
    return re.sub(r"\]\s+", "]", s)


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--expected', required=True, help='CSV fixture attendu')
    p.add_argument('--output', required=True, help='CSV produit à comparer')
    p.add_argument('--out', required=False, help='Fichier de sortie key-only; si absent génère diff_{offset}.txt dans output/')
    args = p.parse_args()

    exp_p = Path(args.expected)
    out_p = Path(args.output)
    # determine output path if not provided
    if args.out:
        out_f = Path(args.out)
    else:
        exp_name = exp_p.name
        import re
        m = re.search(r'(?:expected_|expected)(\d+-\d+)', exp_name)
        if not m:
            m = re.search(r'(\d+-\d+)', exp_name)
        if m:
            base = f'diff_{m.group(1)}.txt'
        else:
            base = 'diff_keyonly.txt'
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
        k = extract_key(r)
        if not k or k.lower().startswith('column1'):
            continue
        out_map[k] = r

    lines = []
    for i, er in enumerate(exp_rows, start=1):
        key = extract_key(er)
        if not key or key.lower().startswith('column1'):
            continue
        orow = out_map.get(key)
        if orow is None:
            lines.append(f"Line {i}: {key}  -> MISSING")
        else:
            # Compare normalized phrase_réécrite to ignore spaces after ']'
            exp_phrase = normalize_after_bracket(extract_phrase(er))
            out_phrase = normalize_after_bracket(extract_phrase(orow))
            if exp_phrase != out_phrase:
                lines.append(f"Line {i}: {key}")

    out_f.parent.mkdir(parents=True, exist_ok=True)
    out_f.write_text("\n".join(lines), encoding='utf-8')
    print(f'Wrote {len(lines)} key-only diffs to {out_f}')


if __name__ == '__main__':
    main()

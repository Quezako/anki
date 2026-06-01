#!/usr/bin/env python3
"""
normalize_config_keys.py

Nettoie et raccourcit de manière conservatrice les clés des mappings
dans `sentence-rewrite/config_maps.json` en extrayant la sous-chaîne
strictement différente entre clé et valeur (ignorant les espaces) et en
normalisant les annotations imbriquées.

Usage:
  python sentence-rewrite/tools/normalize_config_keys.py \
    --file sentence-rewrite/config_maps.json --backup --apply

Options:
  --file PATH   : chemin vers le fichier JSON (défaut: sentence-rewrite/config_maps.json)
  --backup      : créer une copie de sauvegarde avant écriture
  --apply       : appliquer les modifications (sinon dry-run)
    --min-core N  : longueur minimale du "coeur" (en caractères non-espace) pour appliquer (défaut: 6)
  --verbose     : afficher détails

Le script n'essaie PAS de committer ni de pousser. Il est conservateur
: il n'applique un remplacement que si le coeur différent a au moins
`--min-core` caractères, et si aucune collision n'est détectée.
"""

from pathlib import Path
import argparse
import json
import re
import shutil
import sys

TOKEN_RE = re.compile(r'[^\s\[\]]+\[[^\]]+\]|[一-龯々〆〤]+|[ぁ-ゟ]+|[ァ-ヿ]+|\w+|[^\s]')


def normalize_ann(s: str) -> str:
    """Nettoie espaces et annotations imbriquées répétées."""
    if s is None:
        return s
    s = s.strip()
        # Important: do NOT insert or normalize internal spaces here.
        # Preserve original internal spacing; only trim and clean bracket spacing.
    prev = None
    while s != prev:
        prev = s
        s = re.sub(r'([^\s\[\]]+)\[\1\[([^\]]+)\]\]+', r"\1[\2]", s)
        s = re.sub(r'\]\]+', ']', s)
        s = re.sub(r'\[\[+', '[', s)
    s = re.sub(r'\s*\[\s*', '[', s)
    s = re.sub(r'\s*\]\s*', ']', s)
    s = re.sub(r'((?:[^\s\[]+\[[^\]]+\]))(?:\s+\1)+', r'\1', s)
        # Do not remove duplicated tokens separated by spaces; avoid inserting spaces.
    return s.strip()


def unit_normal(u: str) -> str:
    """Renvoie la représentation normalisée d'une unité (lecture si entre [])"""
    m = re.search(r'\[([^\]]+)\]', u)
    if m:
        return m.group(1)
    return u


def collapse_spaces(s: str) -> str:
    return re.sub(r'\s+', '', s)


def strip_prefix_by_nonsapce_count(orig: str, n: int) -> str:
    cnt = 0
    for i, ch in enumerate(orig):
        if ch.isspace():
            continue
        cnt += 1
        if cnt == n:
            return orig[i+1:]
    return ''


def strip_suffix_by_nonsapce_count(orig: str, n: int) -> str:
    cnt = 0
    for i in range(len(orig) - 1, -1, -1):
        if orig[i].isspace():
            continue
        cnt += 1
        if cnt == n:
            return orig[:i]
    return ''


def process_mapping_dict(d: dict, min_core: int, verbose: bool):
    newmap = {}
    changes = []
    removed = []
    for key, val in d.items():
        if not isinstance(key, str) or not isinstance(val, str):
            newmap[key] = val
            continue
        key_clean = key.strip()
        val_clean = val.strip()
        if collapse_spaces(key_clean) == collapse_spaces(val_clean):
            removed.append((key, val, collapse_spaces(key_clean)))
            continue
        # use finditer to preserve original spans/spacing between units
        k_matches = list(TOKEN_RE.finditer(key_clean))
        v_matches = list(TOKEN_RE.finditer(val_clean))
        k_units = [m.group(0) for m in k_matches]
        v_units = [m.group(0) for m in v_matches]
        k_spans = [m.span() for m in k_matches]
        v_spans = [m.span() for m in v_matches]
        if not k_units or not v_units:
            newmap[key] = val
            continue
        # prefix by unit-normalized form
        L = 0
        mmin = min(len(k_units), len(v_units))
        while L < mmin and unit_normal(k_units[L]) == unit_normal(v_units[L]):
            L += 1
        # suffix
        R = 0
        i = len(k_units) - 1
        j = len(v_units) - 1
        while i >= L and j >= L and unit_normal(k_units[i]) == unit_normal(v_units[j]):
            R += 1
            i -= 1
            j -= 1
        if L + R >= len(k_units) or L + R >= len(v_units):
            newmap[key] = val
            continue
        # extract core substrings using original spans so we preserve original spacing
        start_k = k_spans[L][0]
        end_k = k_spans[len(k_units) - R - 1][1]
        start_v = v_spans[L][0]
        end_v = v_spans[len(v_units) - R - 1][1]
        # Preserve core spacing exactly as in the original strings: do not normalize.
        core_k = key_clean[start_k:end_k].strip()
        core_v = val_clean[start_v:end_v].strip()
        # do not apply if core would be too short (avoid generic false positives)
        if len(re.sub(r'\s+', '', core_k)) < min_core or len(re.sub(r'\s+', '', core_v)) < min_core:
            newmap[key] = val
            continue
        # never cut inside or adjacent to bracket delimiters: require balanced brackets
        def balanced_and_not_cut(s: str) -> bool:
            if not s:
                return False
            if s[0] == ']' or s[-1] == '[':
                return False
            # brackets count must match
            if s.count('[') != s.count(']'):
                return False
            return True
        if not balanced_and_not_cut(core_k) or not balanced_and_not_cut(core_v):
            newmap[key] = val
            continue
        if core_k in newmap and newmap[core_k] != core_v:
            newmap[key] = val
            continue
        changes.append((key, val, core_k, core_v))
        newmap[core_k] = core_v
        if verbose:
            print(f"Apply: {key!r} -> {core_k!r}   |   {val!r} -> {core_v!r}")
    return newmap, changes, removed


def run(path: Path, apply: bool, backup: bool, min_core: int, verbose: bool):
    data = json.loads(path.read_text(encoding='utf-8'))
    overall_changes = []
    overall_removed = []
    updated = False
    for topk, topv in list(data.items()):
        if isinstance(topv, dict):
            newmap, changes, removed = process_mapping_dict(topv, min_core, verbose)
            if changes or removed:
                overall_changes.extend([(topk,) + c for c in changes])
                overall_removed.extend([(topk,) + r for r in removed])
                data[topk] = newmap
                updated = True
    if not updated:
        print('No changes suggested')
        return 0
    if backup:
        bak = path.with_suffix(path.suffix + '.bak')
        shutil.copy(path, bak)
        if verbose:
            print('Backup written to', bak)
    if apply:
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
        print('Applied', len(overall_changes), 'changes, removed', len(overall_removed), 'no-op mappings')
    else:
        print('Dry-run: would apply', len(overall_changes), 'changes, remove', len(overall_removed), 'no-op mappings')
    # print compact report
    for topk, oldk, oldv, newk, newv in overall_changes:
        print(f"- [{topk}]\n  {oldk!r}  =>  {newk!r}\n  {oldv!r}  =>  {newv!r}")
    if overall_removed:
        print('\nRemoved (no-op after collapse):')
        for topk, ok, ov, collapsed in overall_removed:
            print(f"- [{topk}] {ok!r} -> {collapsed!r}")
    return 0


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--file', '-f', default='sentence-rewrite/config_maps.json')
    parser.add_argument('--backup', action='store_true')
    parser.add_argument('--apply', action='store_true')
    parser.add_argument('--min-core', type=int, default=6)
    parser.add_argument('--verbose', action='store_true')
    args = parser.parse_args()
    path = Path(args.file)
    if not path.exists():
        print('File not found:', path)
        sys.exit(2)
    sys.exit(run(path, args.apply, args.backup, args.min_core, args.verbose))

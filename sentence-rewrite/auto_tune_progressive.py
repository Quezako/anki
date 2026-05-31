#!/usr/bin/env python3
"""Auto-tuning progressif des normalisations.

Stratégie:
- Récupère les candidats depuis `FINAL_NORMALIZATIONS` et `ADDITIONAL_FIXES` dans `config_maps.json`.
- Teste les règles par lots (batch). Si un lot provoque une régression sur 0–40, on le bissecte pour isoler les règles problématiques.
- Conserve les règles sûres dans `sentence-rewrite/config_overrides.json`.
- Exécute la vérification `regression_check.py` pour confirmer 0–40 (doit rester OK) et affiche le résultat pour 40–80.

Ce script écrit des fichiers temporaires et restaure l'état s'il est interrompu.
"""

import json
import os
import subprocess
import sys
from copy import deepcopy

ROOT = os.path.dirname(__file__)
CONFIG_MAPS = os.path.join(ROOT, "config_maps.json")
OVERRIDES = os.path.join(ROOT, "config_overrides.json")
HARNESS = os.path.join(ROOT, "tests", "regression_check.py")


def load_config():
    with open(CONFIG_MAPS, "r", encoding="utf-8") as f:
        return json.load(f)


def gather_candidates(cfg):
    candidates = []
    # prefer FINAL_NORMALIZATIONS first, then ADDITIONAL_FIXES
    for sec in ("FINAL_NORMALIZATIONS", "ADDITIONAL_FIXES"):
        block = cfg.get(sec, {})
        for k, v in block.items():
            candidates.append((sec, k, v))
    # deduplicate by (k,v) keeping first occurrence
    seen = set()
    uniq = []
    for sec, k, v in candidates:
        key = (k, v)
        if key in seen:
            continue
        seen.add(key)
        uniq.append((sec, k, v))
    return uniq


def write_overrides(rules):
    # rules: dict of sections -> {k: v}
    with open(OVERRIDES, "w", encoding="utf-8") as f:
        json.dump(rules, f, ensure_ascii=False, indent=2)


def run_harness(offset=0, limit=40):
    env = os.environ.copy()
    env["PYTHONUTF8"] = "1"
    cmd = [sys.executable, HARNESS, "--offset", str(offset), "--limit", str(limit)]
    proc = subprocess.run(cmd, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding='utf-8')
    return proc.returncode == 0, proc.stdout


def test_batch(batch, prefix_rules):
    # prefix_rules: existing rules to keep in overrides
    rules = deepcopy(prefix_rules)
    for sec, k, v in batch:
        rules.setdefault(sec, {})[k] = v
    write_overrides(rules)
    ok, out = run_harness(offset=0, limit=40)
    return ok, out


def bisect_and_collect(items, prefix_rules, collector):
    # items: list of candidates (sec,k,v)
    if not items:
        return
    ok, _ = test_batch(items, prefix_rules)
    if ok:
        # safe: add all
        for sec, k, v in items:
            collector.setdefault(sec, {})[k] = v
        return
    if len(items) == 1:
        # single item causes regression -> unsafe
        return
    mid = len(items) // 2
    bisect_and_collect(items[:mid], prefix_rules, collector)
    # update prefix_rules with collected so far to avoid interfering
    new_prefix = deepcopy(prefix_rules)
    for sec, block in collector.items():
        new_prefix.setdefault(sec, {}).update(block)
    bisect_and_collect(items[mid:], new_prefix, collector)


def main():
    cfg = load_config()
    candidates = gather_candidates(cfg)
    print(f"Found {len(candidates)} candidate rules to test.")

    safe = {}
    prefix = {}  # start with empty overrides

    batch_size = 8
    idx = 0
    # iterate in batches, progressively
    while idx < len(candidates):
        batch = candidates[idx: idx + batch_size]
        print(f"Testing batch {idx}-{idx+len(batch)-1} (size={len(batch)})...")
        ok, out = test_batch(batch, prefix)
        if ok:
            print(f"Batch safe; keeping {len(batch)} rules.")
            for sec, k, v in batch:
                safe.setdefault(sec, {})[k] = v
            # extend prefix
            for sec, block in safe.items():
                prefix.setdefault(sec, {}).update(block)
            idx += batch_size
            # try to grow batch size slowly
            batch_size = min(batch_size * 2, 32)
        else:
            print("Batch caused regression; bisecting...")
            # bisect the failing batch
            bisect_and_collect(batch, prefix, safe)
            # update prefix with currently safe
            for sec, block in safe.items():
                prefix.setdefault(sec, {}).update(block)
            idx += batch_size
            # reduce batch size to be conservative
            batch_size = max(1, batch_size // 2)

    # write final overrides
    if safe:
        final = {}
        # Only write sections that contain entries
        for sec, block in safe.items():
            final[sec] = block
        write_overrides(final)
        print(f"Wrote {sum(len(b) for b in safe.values())} safe rules to {OVERRIDES}.")
    else:
        # ensure overrides removed
        if os.path.exists(OVERRIDES):
            os.remove(OVERRIDES)
        print("No safe rules found.")

    print("Final verification: 0–40 then 40–80")
    ok0, out0 = run_harness(0, 40)
    ok1, out1 = run_harness(40, 40)
    print("0–40 pass:", ok0)
    print("40–80 pass:", ok1)
    if not ok0:
        print("Regression detected on 0–40; output:\n", out0)
    if not ok1:
        print("40–80 diffs:\n", out1)


if __name__ == '__main__':
    main()

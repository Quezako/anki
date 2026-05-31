#!/usr/bin/env python3
"""Auto-tune candidate rules by testing each in isolation against the 0-40 fixture.

Strategy:
- Backup `config_maps.json`.
- For each candidate rule found in `FINAL_NORMALIZATIONS` and `ADDITIONAL_FIXES` of the original config:
  - Write a minimal `config_maps.json` containing only that single rule.
  - Run the regression harness for `--offset 0 --limit 40`.
  - If the test passes, mark the rule as safe.
- Restore original `config_maps.json` and write safe rules into `config_overrides.json`.
"""
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SR_DIR = ROOT / "sentence-rewrite"
MAPS_PATH = SR_DIR / "config_maps.json"
OVERRIDES_PATH = SR_DIR / "config_overrides.json"
BACKUP_PATH = SR_DIR / "config_maps.json.bak_autotune"


def load_maps(path: Path):
    if not path.exists():
        return {}
    with path.open("r", encoding="utf-8") as fh:
        return json.load(fh)


def write_maps(path: Path, data: dict):
    with path.open("w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)


def run_harness(offset=0, limit=40):
    python_exe = SR_DIR.parent.joinpath('.venv', 'Scripts', 'python.exe')
    if not python_exe.exists():
        python_exe = Path(sys.executable)
    cmd = [str(python_exe), str(SR_DIR / 'tests' / 'regression_check.py'), '--offset', str(offset), '--limit', str(limit)]
    proc = subprocess.run(cmd, cwd=str(SR_DIR.parent))
    return proc.returncode == 0


def main():
    if not MAPS_PATH.exists():
        print(f"Config not found: {MAPS_PATH}")
        sys.exit(2)
    orig = load_maps(MAPS_PATH)
    # Collect candidates
    final = orig.get('FINAL_NORMALIZATIONS', {})
    addfix = orig.get('ADDITIONAL_FIXES', {})
    candidates = []
    for k, v in final.items():
        candidates.append(('FINAL_NORMALIZATIONS', k, v))
    for k, v in addfix.items():
        candidates.append(('ADDITIONAL_FIXES', k, v))

    print(f"Found {len(candidates)} candidate rules to test.")

    # Backup original
    if BACKUP_PATH.exists():
        print(f"Backup already exists at {BACKUP_PATH}; aborting to avoid overwrite.")
        sys.exit(2)
    shutil.copy2(MAPS_PATH, BACKUP_PATH)

    safe_final = {}
    safe_addfix = {}

    try:
        # Start with a minimal maps file for isolation tests
        base_min = {"PREFER_MAP": {}, "ADDITIONAL_FIXES": {}, "FINAL_NORMALIZATIONS": {}}
        # Write minimal config to maps path
        write_maps(MAPS_PATH, base_min)

        for idx, (section, k, v) in enumerate(candidates, start=1):
            print(f"[{idx}/{len(candidates)}] Testing {section}: {k}")
            test_cfg = {"PREFER_MAP": {}, "ADDITIONAL_FIXES": {}, "FINAL_NORMALIZATIONS": {}}
            test_cfg[section][k] = v
            write_maps(MAPS_PATH, test_cfg)
            ok = run_harness(offset=0, limit=40)
            if ok:
                print(f"  -> SAFE")
                if section == 'FINAL_NORMALIZATIONS':
                    safe_final[k] = v
                else:
                    safe_addfix[k] = v
            else:
                print(f"  -> CAUSED REGRESSION")

        print("Testing complete. Restoring original config...")
    finally:
        # Restore original config
        shutil.move(str(BACKUP_PATH), str(MAPS_PATH))

    # Write overrides with safe rules only
    overrides = {}
    if safe_final:
        overrides['FINAL_NORMALIZATIONS'] = safe_final
    if safe_addfix:
        overrides['ADDITIONAL_FIXES'] = safe_addfix
    if overrides:
        print(f"Writing {len(safe_final)+len(safe_addfix)} safe rules to {OVERRIDES_PATH}")
        # Merge with any existing overrides
        existing = load_maps(OVERRIDES_PATH) if OVERRIDES_PATH.exists() else {}
        for sec in ('FINAL_NORMALIZATIONS', 'ADDITIONAL_FIXES'):
            if sec in overrides:
                existing.setdefault(sec, {}).update(overrides[sec])
        write_maps(OVERRIDES_PATH, existing)
    else:
        print("No safe rules found; no overrides written.")

    # Run final checks
    print("Running final regression tests: 0-40 and 40-80...")
    ok0 = run_harness(offset=0, limit=40)
    ok1 = run_harness(offset=40, limit=40)
    print(f"0-40 pass: {ok0}; 40-80 pass: {ok1}")


if __name__ == '__main__':
    main()

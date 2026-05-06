import json
from pathlib import Path

import requests

BASE_URL = 'http://127.0.0.1:8766/create_filtered_deck'
ROOT_DECK = '00-Vocabulary-JLPT::01-audio-to-picture::04-learn-by-syllabus'
REGEX_FILE = Path(__file__).resolve().parents[1] / 'smart-srs' / 'output' / 'grouped_syllables_regex.txt'
ORDER_FILE = Path(__file__).resolve().parents[1] / 'smart-srs' / 'output' / 'grouped_syllables.txt'
FILTER_PREFIX = 'deck:Quezako card:3 (tag:JLPT::5 OR tag:JLPT::4 OR tag:JLPT::3) prop:due<31 '


def parse_regex_file(path):
    entries = []
    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            if ':re:' not in line:
                continue
            group_name, regex = line.rsplit(':re:', 1)
            group_name = group_name.strip()
            regex = regex.strip()
            if not group_name or not regex:
                continue
            entries.append((group_name, regex))
    return entries


def parse_order_file(path):
    order = []
    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line.startswith('Groupe:'):
                continue
            header = line[len('Groupe:'):].strip()
            group_name = header.split('(', 1)[0].strip()
            if group_name:
                order.append(group_name)
    return order


def create_filtered_deck(group_name, regex, index, limit=9999):
    deck_name = f'{ROOT_DECK}::{index:02d} - {group_name}'
    search = f'{FILTER_PREFIX}"key:re:{regex}"'
    payload = {
        'name': deck_name,
        'search': search,
        'limit': limit,
    }
    response = requests.post(BASE_URL, json=payload)
    response.raise_for_status()
    return response.json()


def main():
    print('Using regex file:', REGEX_FILE)
    print('Using order file:', ORDER_FILE)
    entries = parse_regex_file(REGEX_FILE)
    order = parse_order_file(ORDER_FILE)
    print(f'Found {len(order)} ordered groups in grouped_syllables.txt.')

    regex_map = {name: regex for name, regex in entries}
    ordered_entries = []
    for group_name in order:
        if group_name in regex_map:
            ordered_entries.append((group_name, regex_map.pop(group_name)))
    for group_name, regex in entries:
        if group_name in regex_map:
            ordered_entries.append((group_name, regex))
    entries = ordered_entries
    print(f'Found {len(entries)} regex entries.')

    results = []
    for index, (group_name, regex) in enumerate(entries, start=1):
        print(f'Creating deck for group: {group_name}')
        try:
            result = create_filtered_deck(group_name, regex, index)
            print('  OK:', result)
            results.append((group_name, 'ok', result))
        except Exception as exc:
            print('  ERROR:', exc)
            results.append((group_name, 'error', str(exc)))

    summary = {'ok': 0, 'error': 0}
    for _, status, _ in results:
        summary[status] += 1
    print('\nSummary:')
    print(f"  OK: {summary['ok']}")
    print(f"  ERROR: {summary['error']}")

    output_path = Path(__file__).resolve().parent / 'output' / 'create_decks_from_regex_results.json'
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f'Wrote results to {output_path}')


if __name__ == '__main__':
    main()

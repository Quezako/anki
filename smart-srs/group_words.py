import csv
import re
from collections import defaultdict, Counter

HIRAGANA_ROMAJI = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'ゔ': 'vu',
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
    'ゎ': 'wa', 'ゐ': 'wi', 'ゑ': 'we'
}

KATAKANA_TO_HIRAGANA = {chr(i): chr(i - 0x60) for i in range(ord('ァ'), ord('ン') + 1)}
KATAKANA_TO_HIRAGANA.update({'ヴ': 'ゔ', 'ヵ': 'か', 'ヶ': 'け', 'ー': 'ー'})

DIGRAPHS = {k: v for k, v in HIRAGANA_ROMAJI.items() if len(k) == 2}
SINGLE = {k: v for k, v in HIRAGANA_ROMAJI.items() if len(k) == 1}


def extract_pronunciation(word):
    match = re.search(r'\[([^\]]+)\]', word)
    return match.group(1) if match else ''


def katakana_to_hiragana(kana):
    return ''.join(KATAKANA_TO_HIRAGANA.get(ch, ch) for ch in kana.strip())


def hiragana_to_romaji(kana):
    roman = ''
    i = 0
    double = False
    while i < len(kana):
        if kana[i] == 'っ':
            double = True
            i += 1
            continue

        if kana[i:i+2] in DIGRAPHS:
            syl = DIGRAPHS[kana[i:i+2]]
            i += 2
        else:
            syl = SINGLE.get(kana[i], '')
            i += 1

        if double and syl and syl[0] in 'bcdfghjklmnpqrstvwxyz':
            syl = syl[0] + syl
            double = False
        roman += syl
    return roman


def long_vowel_category(romaji):
    if not romaji:
        return None
    if 'ou' in romaji or 'oo' in romaji:
        return 'o'
    if 'uu' in romaji:
        return 'u'
    if 'ei' in romaji or 'ee' in romaji:
        return 'e'
    if 'ii' in romaji:
        return 'i'
    return None


def has_small_tsu(kana):
    return 'っ' in kana or 'ッ' in kana


def parse_on_readings(on_field):
    return [katakana_to_hiragana(part.strip()) for part in re.split(r'[,/]', on_field) if part.strip()]


def group_entries(entries):
    groups = defaultdict(dict)
    prefix_counts = defaultdict(Counter)
    
    # First pass: count prefixes for each category
    for entry in entries:
        hiragana = entry['hiragana'] or extract_pronunciation(entry['word'])
        romaji = hiragana_to_romaji(hiragana)
        cat = long_vowel_category(romaji)
        if cat:
            prefix = romaji[:3] if len(romaji) >= 3 else romaji
            prefix_counts[cat][prefix] += 1
    
    # Second pass: group
    for entry in entries:
        hiragana = entry['hiragana'] or extract_pronunciation(entry['word'])
        entry['hiragana'] = hiragana
        romaji = hiragana_to_romaji(hiragana)
        cat = long_vowel_category(romaji)
        if cat:
            prefix = romaji[:3] if len(romaji) >= 3 else romaji
            if prefix_counts[cat][prefix] >= 10:
                groups[f"long_vowel:{cat}:{prefix}"][entry['word']] = entry
            else:
                groups[f"long_vowel:{cat}"][entry['word']] = entry
        else:
            groups['other'][entry['word']] = entry

    return {key: list(value.values()) for key, value in groups.items()}


def group_basis_description(group_name):
    if group_name.startswith('long_vowel:'):
        vowel = group_name.split(':',1)[1]
        return f"regroupé par voyelle longue '{vowel}' (n'importe où dans le mot)"
    if group_name == 'other':
        return "regroupé par autres prononciations (sans voyelle longue)"
    if group_name.startswith('other'):
        return "regroupé par autres prononciations (sans voyelle longue)"
    return f"regroupé par prononciation '{group_name}'"


def split_large_group(key, group, max_size):
    if len(group) <= max_size:
        return {key: group}
    result = {}
    for i in range(0, len(group), max_size):
        suffix = i // max_size + 1
        result[f"{key}_{suffix}"] = group[i:i+max_size]
    return result


def filter_groups(groups, min_size=10, max_size=50):
    filtered = {}
    small_groups = []
    for key, group in groups.items():
        if key.count(':') == 2:  # Syllable groups like long_vowel:o:kyo
            if len(group) >= min_size:
                filtered[key] = group
            else:
                cat = key.split(':')[1]
                small_groups.append((f"long_vowel:{cat}", group))
        elif key.startswith('long_vowel:'):  # Remaining like long_vowel:o
            if len(group) >= min_size:
                filtered.update(split_large_group(key, group, max_size))
            else:
                small_groups.append((key, group))
        else:
            if len(group) >= min_size:
                filtered.update(split_large_group(key, group, max_size))
            else:
                small_groups.append((key, group))

    # Combine small groups
    combined = []
    for _, group in small_groups:
        combined.extend(group)
    if combined:
        filtered.update(split_large_group('combined', combined, max_size))

    return filtered


def main():
    input_file = 'input/sound-to-pic_hard-med.txt'
    output_file = 'grouped_words.txt'

    entries = []
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='\t')
        for row in reader:
            if len(row) >= 64 and not row[0].startswith('#'):
                word = row[0]
                definition = row[1]
                tags = row[63] if len(row) > 63 else ''
                hiragana = row[20].strip() if len(row) > 20 else ''
                on_field = row[21].strip() if len(row) > 21 else ''
                on_readings = parse_on_readings(on_field)
                entries.append({
                    'word': word,
                    'definition': definition,
                    'tags': tags,
                    'hiragana': hiragana,
                    'on_hiragana': on_readings,
                    'on_katakana': on_field,
                })

    print(f"Total entries: {len(entries)}")
    groups = group_entries(entries)
    print(f"Total raw groups: {len(groups)}")

    filtered_groups = filter_groups(groups)
    print(f"Filtered groups: {len(filtered_groups)}")

    with open(output_file, 'w', encoding='utf-8') as f:
        for group_name, group in filtered_groups.items():
            basis = group_basis_description(group_name)
            f.write(f"Groupe: {group_name} ({len(group)} mots) - {basis}\n")
            for entry in group:
                f.write(f"  {entry['word']} - {entry['definition']} - Tags: {entry['tags']}\n")
            f.write("\n")

if __name__ == '__main__':
    main()

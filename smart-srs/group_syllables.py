import argparse
import csv
import os
import re
from collections import Counter, defaultdict

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
    'ゎ': 'wa', 'ゐ': 'wi', 'ゑ': 'we',
}
KATAKANA_ROMAJI = {}
for kana, romaji in HIRAGANA_ROMAJI.items():
    katakana = ''.join(
        chr(ord(ch) + 0x60) if '\u3041' <= ch <= '\u3096' else ch
        for ch in kana
    )
    KATAKANA_ROMAJI[katakana] = romaji

KANA_ROMAJI = {**HIRAGANA_ROMAJI, **KATAKANA_ROMAJI}
DIGRAPHS = {k: v for k, v in KANA_ROMAJI.items() if len(k) == 2}
SINGLE = {k: v for k, v in KANA_ROMAJI.items() if len(k) == 1}

LONG_PATTERNS = ('aa', 'ii', 'uu', 'ee', 'oo', 'ou', 'ei')
CATEGORY_PRIORITY = ['o', 'u', 'e', 'i']


def extract_pronunciation(word):
    match = re.search(r'\[([^\]]+)\]', word)
    return match.group(1) if match else ''


def hiragana_to_syllables(hiragana):
    syllables = []
    i = 0
    while i < len(hiragana):
        if i + 1 < len(hiragana) and hiragana[i:i+2] in DIGRAPHS:
            syllables.append(hiragana[i:i+2])
            i += 2
        else:
            syllables.append(hiragana[i])
            i += 1
    return syllables


def syllable_to_romaji(syllable):
    if syllable in KANA_ROMAJI:
        return KANA_ROMAJI[syllable]
    return ''


def hiragana_to_romaji(hiragana):
    roman = ''
    syllables = hiragana_to_syllables(hiragana)
    for syl in syllables:
        roman += syllable_to_romaji(syl)
    return roman


def kana_to_hiragana(kana):
    """Convert katakana to hiragana while preserving hiragana characters."""
    result = []
    for ch in kana:
        if '\u30A1' <= ch <= '\u30F6':
            result.append(chr(ord(ch) - 0x60))
        else:
            result.append(ch)
    return ''.join(result)


def normalize_long_vowel_mark(kana):
    """Expand the long vowel mark ー into vowel kana for phonetic matching."""
    result = ''
    for ch in kana:
        if ch == 'ー':
            prev_romaji = hiragana_to_romaji(result)
            if not prev_romaji:
                continue
            last_vowel = next((c for c in reversed(prev_romaji) if c in 'aiueo'), None)
            if not last_vowel:
                continue
            if last_vowel == 'e':
                result += 'い'
            elif last_vowel == 'o':
                result += 'う'
            elif last_vowel == 'a':
                result += 'あ'
            elif last_vowel == 'i':
                result += 'い'
            elif last_vowel == 'u':
                result += 'う'
            else:
                result += last_vowel
        else:
            result += ch
    return result


def get_entry_kana(entry):
    kana = entry.get('hiragana') or extract_pronunciation(entry.get('word', ''))
    if not kana:
        word = entry.get('word', '')
        if any('\u3040' <= ch <= '\u30ff' for ch in word):
            kana = word
    kana = normalize_long_vowel_mark(kana)
    return kana_to_hiragana(kana)


def extract_long_vowel_segments(hiragana):
    syllables = hiragana_to_syllables(hiragana)
    segments = []
    for i in range(len(syllables) - 1):
        current = syllables[i]
        nxt = syllables[i + 1]
        if current == 'っ' or nxt == 'っ':
            continue
        rom_current = syllable_to_romaji(current)
        rom_next = syllable_to_romaji(nxt)
        combo = rom_current + rom_next
        if not combo:
            continue
        if any(combo.endswith(pattern) for pattern in LONG_PATTERNS):
            segments.append((current + nxt, combo))
    return segments


def has_long_vowel(hiragana):
    return bool(extract_long_vowel_segments(hiragana))


def get_vowel_before_n(hiragana):
    romaji = hiragana_to_romaji(hiragana)
    n_pos = romaji.find('n')
    if n_pos == -1:
        return None
    before = romaji[:n_pos]
    if before and before[-1] in ('a', 'i', 'u', 'e', 'o'):
        return before[-1]
    return None


def extract_short_segments(hiragana):
    syllables = hiragana_to_syllables(hiragana)
    segments = []
    for length in (3, 2, 1):
        for i in range(len(syllables) - length + 1):
            seg = ''.join(syllables[i:i + length])
            if 'っ' in seg:
                continue
            if not has_long_vowel(seg):
                segments.append(seg)
    return segments


def long_vowel_category(romaji):
    if not romaji:
        return None
    if romaji.endswith(('ou', 'oo')):
        return 'o'
    if romaji.endswith('uu'):
        return 'u'
    if romaji.endswith(('ei', 'ee')):
        return 'e'
    if romaji.endswith('ii'):
        return 'i'
    if romaji.endswith('aa'):
        return 'a'
    return None


def get_first_vowel(hiragana):
    """Extract vowel of first syllable."""
    syllables = hiragana_to_syllables(hiragana)
    if not syllables:
        return None
    first = syllables[0]
    romaji = syllable_to_romaji(first)
    for vowel in ('a', 'i', 'u', 'e', 'o'):
        if vowel in romaji:
            return vowel
    return None


def get_syllable_position(hiragana, syllable):
    """Return position of syllable in word: 'start', 'end', 'middle', or None."""
    syllables = hiragana_to_syllables(hiragana)
    if not syllables:
        return None
    
    if syllables[0] == syllable:
        return 'start'
    if syllables[-1] == syllable:
        return 'end'
    if syllable in syllables[1:-1]:  # In middle (not first or last)
        return 'middle'
    return None


def get_vowel_position(hiragana, vowel):
    """Return position of vowel in word: 'start', 'end', 'middle', or None."""
    syllables = hiragana_to_syllables(hiragana)
    if not syllables:
        return None
    
    # Check if the first syllable contains the vowel (start of word by vowel sound)
    first_rom = syllable_to_romaji(syllables[0])
    if vowel in first_rom:
        return 'start'
    
    # Check if last syllable ends with vowel
    last_rom = syllable_to_romaji(syllables[-1])
    if last_rom.endswith(vowel):
        return 'end'
    
    # Check if any middle syllable contains vowel
    for syl in syllables[1:-1]:
        rom = syllable_to_romaji(syl)
        if vowel in rom:
            return 'middle'
    
    return None


def analyze_frequent_syllables(entries, min_freq=10):
    """Analyze frequent syllables and their positions."""
    syllable_counts = defaultdict(lambda: defaultdict(int))
    
    for entry in entries:
        hiragana = get_entry_kana(entry)
        syllables = hiragana_to_syllables(hiragana)
        
        for syl in syllables:
            pos = get_syllable_position(hiragana, syl)
            if pos:
                syllable_counts[syl][pos] += 1
    
    # Get frequent syllables (appear in at least min_freq words)
    frequent = {}
    for syl, positions in syllable_counts.items():
        total = sum(positions.values())
        if total >= min_freq:
            frequent[syl] = dict(positions)
    
    return frequent


def choose_frequent_syllable_group(hiragana, frequent_syllables):
    """Choose the best frequent syllable group for a word by position priority."""
    syllables = hiragana_to_syllables(hiragana)
    candidates = []
    for syl in set(syllables):
        if syl not in frequent_syllables:
            continue
        pos = get_syllable_position(hiragana, syl)
        if not pos:
            continue
        # Priority: start > end > middle
        priority = {'start': 0, 'end': 1, 'middle': 2}.get(pos, 3)
        candidates.append((priority, -sum(frequent_syllables[syl].values()), syl, pos))
    if not candidates:
        return None
    candidates.sort()
    _, _, syllable, pos = candidates[0]
    return f"short:freq:{syllable}_{pos}"


def choose_composed_syllable_group(hiragana, frequent_syllables):
    """Choose the best frequent composed syllable group (きゃ, しょ, ぴゅ, etc.)."""
    syllables = hiragana_to_syllables(hiragana)
    candidates = []
    for syl in set(syllables):
        if len(syl) != 2 or syl not in frequent_syllables:
            continue
        pos = get_syllable_position(hiragana, syl)
        if not pos:
            continue
        priority = {'start': 0, 'end': 1, 'middle': 2}.get(pos, 3)
        candidates.append((priority, -sum(frequent_syllables[syl].values()), syl, pos))
    if not candidates:
        return None
    candidates.sort()
    _, _, syllable, pos = candidates[0]
    return f"short:composed:{syllable}_{pos}"


def get_geminate_key(hiragana):
    """Group geminate by vowel BEFORE the petit tsu (appa, itte, etc.)."""
    if 'っ' not in hiragana:
        return None
    syllables = hiragana_to_syllables(hiragana)
    # Find the geminate (petit tsu) and extract vowel from PREVIOUS syllable
    for i, syl in enumerate(syllables):
        if syl == 'っ' and i > 0:
            # Get previous syllable's romaji (e.g., 'ka', 'ta', 'pa', 'sha')
            prev_syl = syllables[i - 1]
            prev_rom = syllable_to_romaji(prev_syl)
            if prev_rom:
                # Group by vowel: extract last vowel (appa/atta -> 'a', itte -> 'i', etc.)
                vowel = prev_rom[-1] if prev_rom[-1] in 'aiueo' else None
                if vowel:
                    return f"geminate_{vowel}"
    return None


def group_key_for_entry(entry, long_counts, short_counts, frequent_syllables):
    hiragana = get_entry_kana(entry)
    romaji = hiragana_to_romaji(hiragana)
    segments = extract_long_vowel_segments(hiragana)
    if segments:  # Long vowels
        ranked = sorted(
            segments,
            key=lambda seg: (
                CATEGORY_PRIORITY.index(long_vowel_category(seg[1])) if long_vowel_category(seg[1]) in CATEGORY_PRIORITY else len(CATEGORY_PRIORITY),
                -long_counts[seg[1]],
                -len(seg[0])
            )
        )
        chosen = ranked[0]
        cat = long_vowel_category(chosen[1])
        if cat:
            return f"long_{cat}:{chosen[1]}"
    composed_key = choose_composed_syllable_group(hiragana, frequent_syllables)
    if composed_key:
        return composed_key

    if 'っ' in hiragana:
        geminate_key = get_geminate_key(hiragana)
        if geminate_key:
            return f"short:geminate:{geminate_key}"
        return 'short:geminate:other'

    if 'ん' in hiragana:
        vowel = get_first_vowel(hiragana)
        return f"short:with_n:{vowel or 'x'}"

    # Check for frequent syllables by position: début, fin, milieu
    frequent_key = choose_frequent_syllable_group(hiragana, frequent_syllables)
    if frequent_key:
        return frequent_key
    
    short_segments = extract_short_segments(hiragana)
    best = None
    for seg in set(short_segments):
        if seg in short_counts and short_counts[seg] >= 10:
            score = (len(seg), short_counts[seg])
            if not best or score > best[0]:
                best = (score, seg)
    if best:
        seg = best[1]
        if seg == 'ん':
            vowel = get_vowel_before_n(hiragana)
            if vowel:
                return f"short:seg:ん_{vowel}"
        return f"short:seg:{seg}"
    
    # For plain groups, group by vowel position
    vowel = get_first_vowel(hiragana)
    if vowel:
        pos = get_vowel_position(hiragana, vowel)
        if pos:
            return f"short:plain:{vowel}_{pos}"
    return f"short:plain:{vowel or 'x'}_other"


def split_large_group(key, group, max_size=50):
    """Split groups homogeneously: 45+45+45 instead of 50+50+35."""
    if len(group) <= max_size:
        return {key: group}
    
    # Calculate optimal split size for homogeneous distribution
    num_splits = (len(group) + max_size - 1) // max_size
    chunk_size = len(group) // num_splits
    
    result = {}
    for i in range(num_splits):
        start = i * chunk_size
        end = start + chunk_size if i < num_splits - 1 else len(group)
        suffix = i + 1
        result[f"{key}_{suffix}"] = group[start:end]
    
    return result


def filter_groups(groups, min_size=10, max_size=50):
    """Filter and balance groups: keep >=min_size, split >max_size, merge small."""
    filtered = {}
    geminate_groups = {}  # Store all geminate separately
    small_with_n_pool = []

    # Separate geminate from other groups
    for key, group in groups.items():
        if key.startswith('short:geminate:'):
            geminate_groups[key] = group

    # Process non-geminate groups
    for key, group in groups.items():
        if key.startswith('short:geminate:'):
            continue  # Handle later
        
        if key.startswith('long_') and ':' in key:
            if len(group) >= min_size:
                filtered.update(split_large_group(key, group, max_size))
            else:
                # Merge small long vowel groups into combined
                cat = key.split(':')[0].split('_', 1)[1]
                combined_key = f'long_{cat}:combined'
                if combined_key not in filtered:
                    filtered[combined_key] = []
                filtered[combined_key].extend(group)
        elif key.startswith('short:freq:'):
            # Keep frequent syllable groups as is, split if too large
            if len(group) >= min_size:
                filtered.update(split_large_group(key, group, max_size))
            else:
                # Merge small freq groups into plain by first vowel
                vowel = get_first_vowel(group[0]['hiragana'] or extract_pronunciation(group[0]['word']))
                plain_key = f'short:plain:{vowel or "x"}_other'
                if plain_key not in filtered:
                    filtered[plain_key] = []
                filtered[plain_key].extend(group)
        elif key.startswith('short:composed:'):
            if len(group) >= min_size:
                filtered.update(split_large_group(key, group, max_size))
            else:
                # Small composed groups merge into plain by first vowel
                vowel = get_first_vowel(group[0]['hiragana'] or extract_pronunciation(group[0]['word']))
                plain_key = f'short:plain:{vowel or "x"}_other'
                if plain_key not in filtered:
                    filtered[plain_key] = []
                filtered[plain_key].extend(group)
        elif key.startswith('short:with_n:'):
            if len(group) >= min_size:
                filtered.update(split_large_group(key, group, max_size))
            else:
                # Collect small ん groups for merging into a larger group later
                small_with_n_pool.extend(group)
        elif key.startswith('short:plain:'):
            if len(group) >= min_size:
                filtered.update(split_large_group(key, group, max_size))
            else:
                # Keep for now, merge after
                if key not in filtered:
                    filtered[key] = []
                filtered[key].extend(group)
        else:
            # Unknown category
            if len(group) >= min_size:
                filtered.update(split_large_group(key, group, max_size))
            else:
                if 'combined' not in filtered:
                    filtered['combined'] = []
                filtered['combined'].extend(group)

    # Process geminate groups: group by vowel, balance
    geminate_by_vowel = defaultdict(list)
    for key, group in geminate_groups.items():
        if 'geminate_' in key:
            vowel = key.split('_')[-1]
            geminate_by_vowel[vowel].extend(group)
        else:
            geminate_by_vowel['other'].extend(group)

    # Add geminate groups (may need balancing)
    geminate_small_vowels = ['e', 'i', 'o', 'u']  # Small groups to potentially merge
    small_geminate_pool = []  # Collect all small geminate
    
    for vowel in sorted(geminate_by_vowel.keys()):
        group = geminate_by_vowel[vowel]
        key = f'short:geminate:geminate_{vowel}' if vowel != 'other' else 'short:geminate:other'
        if len(group) >= min_size:
            filtered.update(split_large_group(key, group, max_size))
        else:
            # Too small: collect for potential merge
            if vowel in geminate_small_vowels:
                small_geminate_pool.extend(group)
            else:
                # Other/a: keep as-is
                filtered[key] = group
    
    # Merge small geminate groups into balanced sub-groups
    if small_geminate_pool:
        # Balance: group by pairs/triplets, e.g., 17+18 or 11+12+12
        num_groups = max(2, (len(small_geminate_pool) + max_size - 1) // max_size)
        chunk_size = len(small_geminate_pool) // num_groups
        for i in range(num_groups):
            start = i * chunk_size
            end = start + chunk_size if i < num_groups - 1 else len(small_geminate_pool)
            small_key = f'short:geminate:small_{i+1}'
            filtered[small_key] = small_geminate_pool[start:end]

    # Final pass: fix long vowel "combined" groups
    for key in list(filtered.keys()):
        if 'combined' in key and key.startswith('long_'):
            if len(filtered[key]) < min_size:
                # Too small, leave for now (or merge elsewhere)
                pass
            else:
                filtered.update(split_large_group(key, filtered.pop(key), max_size))

    # Final pass: separate entries with "ん" from short:plain groups
    plain_groups_with_n = defaultdict(list)  # Collect entries with ん
    for key in list(filtered.keys()):
        if key.startswith('short:plain:'):
            group = filtered[key]
            # Separate entries with ん
            without_n = []
            for entry in group:
                hiragana = get_entry_kana(entry)
                if 'ん' in hiragana:
                    vowel = get_first_vowel(hiragana)
                    plain_groups_with_n[f'short:with_n:{vowel or "x"}'].append(entry)
                else:
                    without_n.append(entry)
            
            # Update or remove group
            if without_n:
                filtered[key] = without_n
            else:
                del filtered[key]
    
    # Add separated groups with ん (may need balancing)
    for key, group in plain_groups_with_n.items():
        if len(group) >= min_size:
            filtered.update(split_large_group(key, group, max_size))
        else:
            small_with_n_pool.extend(group)

    # Merge all small ん groups into a single grouped category if possible
    if small_with_n_pool:
        if len(small_with_n_pool) >= min_size:
            filtered.update(split_large_group('short:with_n:merged', small_with_n_pool, max_size))
        else:
            if 'combined' not in filtered:
                filtered['combined'] = []
            filtered['combined'].extend(small_with_n_pool)

    # Final pass: merge small plain groups (< min_size)
    plain_groups = [(k, v) for k, v in filtered.items() if k.startswith('short:plain:') and len(v) < min_size]
    if plain_groups:
        # Sort by vowel then size so same-vowel groups merge together
        plain_groups.sort(key=lambda x: (x[0].split(':')[2].split('_')[0], len(x[1]), x[0]))
        merged = {}
        i = 0
        while i < len(plain_groups):
            current_key, current_group = plain_groups[i]
            current_vowel = current_key.split(':')[2].split('_')[0]
            # Merge only with the next group if it has the same vowel
            if i + 1 < len(plain_groups):
                next_key, next_group = plain_groups[i + 1]
                next_vowel = next_key.split(':')[2].split('_')[0]
                if current_vowel == next_vowel and len(current_group) + len(next_group) <= max_size:
                    combined = current_group + next_group
                    merged_key = f"short:plain:{current_vowel}_merged"
                    if merged_key not in merged:
                        merged[merged_key] = []
                    merged[merged_key].extend(combined)
                    i += 2
                    continue
            merged[current_key] = current_group
            i += 1
        # Remove original small groups and add merged
        for k in [k for k, v in plain_groups]:
            if k in filtered:
                del filtered[k]
        filtered.update(merged)

    return filtered


def format_entry(entry):
    hiragana = entry['hiragana'] or extract_pronunciation(entry['word'])
    kanji = entry['word'].split('[')[0].strip()
    if kanji == hiragana or not kanji:
        return f"{hiragana} - {entry['definition']} - Tags: {entry['tags']}"
    return f"{hiragana} ({kanji}) - {entry['definition']} - Tags: {entry['tags']}"


def write_grouped_regex_file(filtered, output_file='grouped_syllables_regex.txt'):
    with open(output_file, 'w', encoding='utf-8') as f:
        for group_name, group in filtered.items():
            regex_values = [re.escape(get_entry_kana(entry)) for entry in group]
            unique_values = sorted(set(regex_values), key=lambda x: (-len(x), x))
            pattern = '|'.join(unique_values)
            f.write(f"{group_name}:re:({pattern})\n")


def group_label(group_name):
    if group_name.startswith('long_o:'):
        key = group_name.split(':', 1)[1]
        return f"Voyelle longue o: {key}"
    if group_name.startswith('long_u:'):
        key = group_name.split(':', 1)[1]
        return f"Voyelle longue u: {key}"
    if group_name.startswith('long_e:'):
        key = group_name.split(':', 1)[1]
        return f"Voyelle longue e: {key}"
    if group_name.startswith('long_i:'):
        key = group_name.split(':', 1)[1]
        return f"Voyelle longue i: {key}"
    if group_name.startswith('short:geminate:'):
        syllable = group_name.split(':', 2)[2]
        return f"Geminate par consonne: {syllable}"
    if group_name.startswith('short:composed:'):
        parts = group_name.split(':', 2)[2].split('_')
        syllable = parts[0]
        position = parts[1] if len(parts) > 1 else 'unknown'
        pos_label = {'start': 'début', 'end': 'fin', 'middle': 'milieu'}.get(position, position)
        return f"Syllabe composée fréquente {syllable} en {pos_label}"
    if group_name.startswith('short:with_n:'):
        vowel = group_name.split(':', 2)[2]
        if vowel == 'merged':
            return "Petites syllabes avec ん fusionnées"
        return f"Petites syllabes avec ん par voyelle première: {vowel}"
    if group_name.startswith('short:freq:'):
        parts = group_name.split(':', 2)[2].split('_')
        syllable = parts[0]
        position = parts[1] if len(parts) > 1 else 'unknown'
        pos_label = {'start': 'début', 'end': 'fin', 'middle': 'milieu'}.get(position, position)
        return f"Syllabe fréquente {syllable} en {pos_label}"
    if group_name.startswith('short:seg:'):
        syllable = group_name.split(':', 2)[2]
        return f"Syllabe courte fréquente: {syllable}"
    if group_name.startswith('short:plain:'):
        parts = group_name.split(':', 2)[2].split('_')
        vowel = parts[0]
        position = parts[1] if len(parts) > 1 else None
        if vowel == 'with_n':
            if len(parts) > 2:
                vowel_letter = parts[2]
                return f"Petites syllabes avec ん, par voyelle: {vowel_letter}"
            return "Petites syllabes avec ん"
        elif position:
            pos_label = {'start': 'début', 'end': 'fin', 'middle': 'milieu', 'other': 'autre'}.get(position, position)
            return f"Petites syllabes voyelle {vowel} en {pos_label}"
        return f"Petites syllabes par voyelle: {vowel}"
    if group_name.startswith('combined'):
        return "Regroupement de petites syllabes"
    return group_name


def segment_complexity(group_name):
    if group_name.startswith('short:seg:'):
        seg = group_name.split(':', 2)[2]
        seg = re.sub(r'_[0-9]+$', '', seg)
        return len(hiragana_to_syllables(seg))
    return 0


def plain_group_sort_key(group_name):
    """Return a sort key for plain vowel groups by vowel order and position."""
    _, _, suffix = group_name.split(':', 2)
    parts = suffix.split('_')
    vowel = parts[0]
    position = parts[1] if len(parts) > 1 else 'other'
    vowel_order = {'a': 0, 'i': 1, 'u': 2, 'e': 3, 'o': 4, 'with_n': 5, 'x': 6}
    pos_order = {'start': 0, 'end': 1, 'middle': 2, 'other': 3, 'merged': 4}
    return (vowel_order.get(vowel, 6), pos_order.get(position, 3), group_name)


def main():
    parser = argparse.ArgumentParser(description='Group Japanese words by pronunciation and optionally generate regex output.')
    parser.add_argument('--regex', action='store_true', help='Write a regex output file in addition to the debug text file.')
    parser.add_argument('--regex-only', action='store_true', help='Write only the regex output file and skip the debug text file.')
    args = parser.parse_args()

    output_dir = 'Output'
    os.makedirs(output_dir, exist_ok=True)
    input_file = 'input/sound-to-pic_hard-med.txt'
    output_file = os.path.join(output_dir, 'grouped_syllables.txt')
    regex_output_file = os.path.join(output_dir, 'grouped_syllables_regex.txt')

    entries = []
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='\t')
        for row in reader:
            if len(row) >= 64 and not row[0].startswith('#'):
                word = row[0]
                definition = row[1]
                tags = row[63] if len(row) > 63 else ''
                hiragana = row[20].strip() if len(row) > 20 else ''
                entries.append({
                    'word': word,
                    'definition': definition,
                    'tags': tags,
                    'hiragana': hiragana,
                })

    segment_counts = Counter()
    for entry in entries:
        hiragana = get_entry_kana(entry)
        for _, romaji in extract_long_vowel_segments(hiragana):
            segment_counts[romaji] += 1

    short_segment_counts = Counter()
    for entry in entries:
        hiragana = get_entry_kana(entry)
        if has_long_vowel(hiragana) or 'っ' in hiragana:
            continue
        for seg in extract_short_segments(hiragana):
            short_segment_counts[seg] += 1

    groups = defaultdict(list)
    frequent_syllables = analyze_frequent_syllables(entries)
    for entry in entries:
        key = group_key_for_entry(entry, segment_counts, short_segment_counts, frequent_syllables)
        groups[key].append(entry)

    grouped = groups
    filtered = filter_groups(grouped)

    ordered = sorted(
        filtered.items(),
        key=lambda item: (
            0 if item[0].startswith('long_o:') else
            1 if item[0].startswith('long_u:') else
            2 if item[0].startswith('long_e:') else
            3 if item[0].startswith('long_i:') else
            4 if item[0].startswith('short:composed:') else
            5 if item[0].startswith('short:geminate:') else
            6 if item[0].startswith('short:with_n:') else
            7 if item[0].startswith('short:freq:') else
            8 if item[0].startswith('short:seg:') else
            9 if item[0].startswith('short:plain:') else 10,
            -segment_complexity(item[0]) if item[0].startswith('short:seg:') else 0,
            -len(item[1]),
            plain_group_sort_key(item[0]) if item[0].startswith('short:plain:') else item[0]
        )
    )

    if not args.regex_only:
        with open(output_file, 'w', encoding='utf-8') as f:
            for group_name, group in ordered:
                label = group_label(group_name)
                f.write(f"Groupe: {group_name} ({len(group)} entrées) - {label}\n")
                sorted_group = sorted(group, key=lambda e: hiragana_to_romaji(get_entry_kana(e)))
                for entry in sorted_group:
                    f.write(f"  {format_entry(entry)}\n")
                f.write('\n')

    print(f"Total entries: {len(entries)}")
    print(f"Total raw groups: {len(grouped)}")
    print(f"Filtered groups: {len(filtered)}")
    if args.regex or args.regex_only:
        write_grouped_regex_file(filtered, regex_output_file)
        print(f"Regex output written to {regex_output_file}")
    if args.regex_only:
        return


if __name__ == '__main__':
    main()

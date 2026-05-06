# Filtered Deck Creator Add-on

Cet add-on expose une petite API HTTP locale pour créer un vrai deck filtré via l'API interne d'Anki.

## Installation

1. Copie le dossier `filtered-deck-addon` dans le dossier des add-ons d'Anki.
   - Sur Windows, c'est généralement `%APPDATA%\Anki2\addons21\`
2. Redémarre Anki.
3. L'addon démarre un serveur local sur `http://127.0.0.1:8766`.

## API

### GET /

Renvoie un statut simple.

### POST /create_filtered_deck

Corps JSON:

```json
{
  "name": "Mon Deck Filtré",
  "search": "tag:deckfilt::1",
  "limit": 9999
}
```

Réponse:

```json
{
  "deck_id": 123456789,
  "deckName": "Mon Deck Filtré"
}
```

## Exemple d'utilisation Python

```python
import json
import requests

url = 'http://127.0.0.1:8766/create_filtered_deck'
payload = {
    'name': 'Filtered Deck 1',
    'search': 'tag:deckfilt::1',
    'limit': 9999,
}
resp = requests.post(url, json=payload)
print(resp.json())
```

## Création automatique de plusieurs decks filtrés

Si tu veux créer tous les decks à partir du fichier `smart-srs/output/grouped_syllables_regex.txt`, utilise le script `create_decks_from_regex.py`.

Il construit un deck par ligne en utilisant ce format de recherche :

```text
deck:Quezako card:3 (tag:JLPT::5 OR tag:JLPT::4 OR tag:JLPT::3) prop:due<31 "key:re:(...)"
```

Les decks créés sont numérotés selon l'ordre des groupes dans `smart-srs/output/grouped_syllables.txt`, par exemple :
`00-Vocabulary-JLPT::01-audio-to-picture::04-learn-by-syllabus::01 - long_o:combined`.

Execute le script depuis le dossier de l'addon :

```bash
cd d:/Dev/10-japanese/anki/filtered-deck-addon
python create_decks_from_regex.py
```

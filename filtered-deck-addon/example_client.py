import json
import requests

URL = 'http://127.0.0.1:8766/create_filtered_deck'

payload = {
    'name': 'Filtered Deck 1',
    'search': 'tag:deckfilt::1',
    'limit': 9999,
}

response = requests.post(URL, json=payload)
response.raise_for_status()
print(json.dumps(response.json(), ensure_ascii=False, indent=2))

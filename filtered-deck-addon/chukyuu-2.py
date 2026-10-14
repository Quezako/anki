import json
import requests

URL = 'http://127.0.0.1:8766/create_filtered_deck'

payload = {
    'name': '00-chukyuu-2::10-kanji-to-audio::L2',
    'search': 'deck:Quezako card:1 (is:new OR prop:due<31) tag:Chukyuu::2::L2',
    'limit': 9999,
}

response = requests.post(URL, json=payload)
response.raise_for_status()
print(json.dumps(response.json(), ensure_ascii=False, indent=2))

payload = {
    'name': '00-chukyuu-2::20-kanji-write::L2',
    'search': 'deck:Quezako card:2 (is:new OR prop:due<31) tag:Chukyuu::2::L2',
    'limit': 9999,
}

response = requests.post(URL, json=payload)
response.raise_for_status()
print(json.dumps(response.json(), ensure_ascii=False, indent=2))

payload = {
    'name': '00-chukyuu-2::30-audio-to-img::L2',
    'search': 'deck:Quezako card:3 (is:new OR prop:due<31) tag:Chukyuu::2::L2',
    'limit': 9999,
}

response = requests.post(URL, json=payload)
response.raise_for_status()
print(json.dumps(response.json(), ensure_ascii=False, indent=2))

payload = {
    'name': '00-chukyuu-2::40-img-to-audio::L2',
    'search': 'deck:Quezako card:4 (is:new OR prop:due<31) tag:Chukyuu::2::L2',
    'limit': 9999,
}

response = requests.post(URL, json=payload)
response.raise_for_status()
print(json.dumps(response.json(), ensure_ascii=False, indent=2))

payload = {
    'name': '00-chukyuu-2::50-sentence-audio-ja::L2',
    'search': 'deck:Quezako card:5 (is:new OR prop:due<31) tag:Chukyuu::2::L2',
    'limit': 9999,
}

response = requests.post(URL, json=payload)
response.raise_for_status()
print(json.dumps(response.json(), ensure_ascii=False, indent=2))

payload = {
    'name': '00-chukyuu-2::60-sentence-fr::L2',
    'search': 'deck:Quezako card:6 (is:new OR prop:due<31) tag:Chukyuu::2::L2',
    'limit': 9999,
}

response = requests.post(URL, json=payload)
response.raise_for_status()
print(json.dumps(response.json(), ensure_ascii=False, indent=2))

payload = {
    'name': '00-chukyuu-2::70-sentence-kanji::L2',
    'search': 'deck:Quezako card:7 (is:new OR prop:due<31) tag:Chukyuu::2::L2',
    'limit': 9999,
}

response = requests.post(URL, json=payload)
response.raise_for_status()
print(json.dumps(response.json(), ensure_ascii=False, indent=2))

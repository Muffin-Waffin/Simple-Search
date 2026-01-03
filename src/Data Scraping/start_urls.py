import json

with open('default.json', 'r') as file:
    url = json.load(file)

    urls = []
    for value in url:
        urls.append(value['link'])

    with open("start_url.json", "w") as f:
        json.dump(urls, f, indent=4)

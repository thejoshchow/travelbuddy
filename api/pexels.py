import requests
import json
from keys import pexels


def get_pic_url(
    location,
):
    url = "https://api.pexels.com/v1/search"
    headers = {"Authorization": pexels}
    params = {"query": f"{location} vaction", "per_page": 1}
    r = requests.get(url, headers=headers, params=params)
    t = json.loads(r.content)
    return t["photos"][0]["src"]["original"]

import requests
import json
import os


class PexelsApi:
    def get_pic(self, search_term):
        url = "https://api.pexels.com/v1/search"
        headers = {"Authorization": os.environ["PEXELS_API_KEY"]}
        params = {"query": f"{search_term} vacation", "per_page": 1}
        r = requests.get(url, headers=headers, params=params)
        t = json.loads(r.content)
        return t["photos"][0]["src"]["original"]

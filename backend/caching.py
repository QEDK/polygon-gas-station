import os
import time
import redis
import requests
from dotenv import load_dotenv
load_dotenv()

r = redis.Redis(host=os.getenv('DB_HOST'), port=os.getenv('DB_PORT'), password=os.getenv('DB_PASSWORD'),
decode_responses=True)
s = requests.Session()

def set_last_block():
    while True:
        next_block = last_known_block = int(r.get("last_included_block"))
        while True:
            if s.get(
                f"https://apis.matic.network/api/v1/matic/block-included/{next_block + 1}"
                ).json()["message"] != "success":
                break
            next_block += 1
            if next_block - last_known_block > 100: # update every 100 blocks anyway if lagging
                last_known_block = next_block
                r.set("last_included_block", next_block)
        if next_block > last_known_block:
            r.set("last_included_block", next_block)
        time.sleep(3600)

if __name__ == "__main__":
    set_last_block()

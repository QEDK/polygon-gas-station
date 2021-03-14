import os
import time
import redis
import requests
import sched
from datetime import date, timedelta
from dotenv import load_dotenv
load_dotenv()

r = redis.Redis(host=os.getenv('DB_HOST'), port=os.getenv('DB_PORT'), password=os.getenv('DB_PASSWORD'),
decode_responses=True)
s = requests.Session()
schdler = sched.scheduler(time.time, time.sleep)

def set_last_block():
    next_block = last_known_block = int(r.get("last_included_block"))
    while True:
        res = s.get(f"https://apis.matic.network/api/v1/matic/block-included/{next_block + 1}").json()
        if res["message"] != "success":
            break
        next_block = int(res["end"])
    if next_block > last_known_block:
        r.set("last_included_block", next_block)

def set_weekly_prices():
    to_date = date.today()
    from_date = to_date - timedelta(weeks=1)
    res = s.get(f"https://api.covalenthq.com/v1/pricing/historical/USD/MATIC/",
        params={"from": from_date.isoformat(), "to": to_date.isoformat()}).json()
    d = {}
    for item in res["data"]["prices"]:
        d[item["date"]] = item["price"]
    r.hset("prices", mapping=d)

def update_current_prices():
    res = s.get(f"https://api.covalenthq.com/v1/pricing/historical/USD/MATIC")

def main():
    set_last_block()
    set_weekly_prices()
    while True:
        schdler.enter(3600, set_last_block)
        schdler.run()

if __name__ == "__main__":
    update_current_prices()

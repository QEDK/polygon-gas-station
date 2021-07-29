import json
import os
import redis
import requests
import sched
import time
from requests.auth import HTTPBasicAuth
from datetime import date, timedelta
from dotenv import load_dotenv
load_dotenv()

r = redis.Redis(host=os.getenv('DB_HOST'), port=os.getenv('DB_PORT'), password=os.getenv('DB_PASSWORD'),
decode_responses=True)
s = requests.Session()
schdler = sched.scheduler(time.time, time.sleep)
gas = {
    "ETH/MATIC transfer": 21000,
    "NFT minting": 143073,
    "NFT approval": 53946,
    "NFT transfer": 83117,
    "ERC20 approval": 29907,
    "ERC20 transfer": 46109,
    "Add liquidity: Uniswap/Quickswap": 134775,
    "Add liquidity: Curve": 182725,
    "Token swap: Uniswap/Quickswap": 130000,
    "Curve swap": 114651,
    "0x swap": 114931,
    "Aave: lend": 186695,
    "Aave: borrow": 269145,
    "Aave: repay": 210337,
    "Opensea: Registry": 389335
    }

def set_last_block():
    last_block = r.hgetall("last_block")
    if not last_block:
        next_block = last_known_block = 17392546
        timestamp = 1627566738
    else:
        next_block = last_known_block = int(last_block["block"])
        timestamp = last_block["timestamp"]
    while True:
        res = s.get(f"https://apis.matic.network/api/v1/matic/block-included/{next_block + 1}").json()
        if res["message"] != "success":
            break
        next_block = int(res["end"])
        timestamp = res["createdAt"]
    if next_block > last_known_block:
        r.hset("last_block", mapping={"block": next_block, "timestamp": timestamp})

def set_currency_prices():
    to_date = date.today()
    from_date = to_date - timedelta(days=6)
    res = s.get(f"https://api.covalenthq.com/v1/pricing/historical/USD/MATIC/",
        params={"from": from_date.isoformat(), "to": to_date.isoformat()},
        auth = HTTPBasicAuth(os.getenv('COVALENT_API'), '')
        ).json()
    d = {}
    for item in res["data"]["prices"]:
        d[item["date"]] = item["price"]
    r.hset("prices", mapping=d)
    while r.hlen("prices") > 7:
        r.hdel("prices", min(r.hkeys("prices")))
    eth_price = s.get(
            f"https://api.covalenthq.com/v1/pricing/historical/USD/ETH/",
            auth = HTTPBasicAuth(os.getenv('COVALENT_API'), '')
            ).json()["data"]["prices"][0]["price"]
    print(eth_price)
    r.hset("currency_prices", mapping={
        "ETH/USD": eth_price,
        "MATIC/USD": d[to_date.isoformat()]
    })

def update_current_price():
    res = s.get(f"https://api.covalenthq.com/v1/pricing/historical/USD/MATIC",
                auth = HTTPBasicAuth(os.getenv('COVALENT_API'), '')
            ).json()["data"]["prices"][0]
    current_date = res["date"]
    if not r.hexists("prices", current_date):
        r.hset("prices", current_date, res["price"])
        r.hdel("prices", min(r.hkeys("prices")))
    else:  # extra logic to ensure >= 7 dates in db
        r.hset("prices", current_date, res["price"])
    eth_price = s.get(
        f"https://api.covalenthq.com/v1/pricing/historical/USD/ETH/",
        auth = HTTPBasicAuth(os.getenv('COVALENT_API'), '')
        ).json()["data"]["prices"][0]["price"]
    print(eth_price)
    r.hset("currency_prices", mapping={
        "ETH/USD": eth_price,
        "MATIC/USD": res["price"]
    })

def set_comparison_prices():
    ethgas = int(s.get(
        "https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key="+os.getenv("DP_APIKEY")
    ).json()["fast"])//10
    maticgas = int(s.get("https://gasstation-mainnet.matic.network").json()["fast"])
    d = {}
    for use, gasused in gas.items():
        d[use] = {"eth": gasused*ethgas, "matic": gasused*maticgas}
    r.set("comparison_prices", json.dumps(d))

def main():
    set_last_block()
    set_currency_prices()
    set_comparison_prices()
    while True:
        schdler.enter(3600, 1, set_last_block)  # one hour
        schdler.enter(900, 1, update_current_price)  # 15 minutes
        schdler.enter(600, 1, set_comparison_prices) # 10 minutes
        schdler.run()

if __name__ == "__main__":
    main()

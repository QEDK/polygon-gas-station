import caching
import json
import multiprocessing as mp
import os
import redis
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

_origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://localhost",
    "https://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

r = redis.Redis(host=os.getenv('DB_HOST'), port=os.getenv('DB_PORT'), password=os.getenv('DB_PASSWORD'),
    decode_responses=True)
s = requests.Session()

cron = mp.Process(target=caching.main, daemon=True)
cron.start()

@app.get("/")
async def test_alive():
    return {"Hello": "World"}

@app.get("/gas_overview")
async def gas_overview():
    return s.get("https://gasstation-mainnet.matic.network").json()

@app.get("/last_block")
async def last_block():
    return r.hgetall("last_block")

@app.get("/historical_prices")
async def historical_prices():
	return r.hgetall("prices")

@app.get("/currency_prices")
async def currency_prices():
    return r.hgetall("currency_prices")

@app.get("/comparison_prices")
async def comparison_prices():
    return json.loads(r.get("comparison_prices"))

@app.get("/debug")
async def check():
    return cron.pid

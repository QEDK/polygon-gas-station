import requests
import redis
from fastapi import FastAPI
from typing import Optional

app = FastAPI()
session = requests.Session()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/gas_overview")
async def fetch_from_oracle():
	return session.get("https://gasstation-mainnet.matic.network").json()

@app.get("/last_block")
async def last_block():
	pass

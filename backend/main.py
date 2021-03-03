import requests
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

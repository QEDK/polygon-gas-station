import redis
from dotenv import load_dotenv
load_dotenv()

r = redis.Redis(host=os.getenv('DB_HOST'), password=os.getenv('DB_PASSWORD'))

def get_last_block():

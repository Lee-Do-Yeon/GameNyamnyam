from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
mongodb_root = os.environ.get('mongodb_root')

mongodb_URI = f"mongodb+srv://root:{mongodb_root}@gamenyamnaym.t2iixnv.mongodb.net/test"
# DB 연결
client = MongoClient(mongodb_URI)
# DB 접속
db = client['nyamnyam']
# Collection 연결
games = db['game']
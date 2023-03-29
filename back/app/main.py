import requests
from fastapi import FastAPI, Depends
from starlette.requests import Request
from steamsignin import SteamSignIn
from recommend import recommend_game
from typing import List
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
mongodb_root = os.environ.get('mongodb_root')
mongodb_URI = f"mongodb+srv://root:{mongodb_root}@gamenyamnaym.t2iixnv.mongodb.net/test"

# DB 연결
client = MongoClient(mongodb_URI)

# DB 접근
db = client['nyamnyam']

# Collection 접근
games = db['game']



api_url = "http://127.0.0.1:8000"


@app.get("/games/{user_id}")
async def get_game_count(user_id: str):
    url = f"https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=FF1F5EF115E50CEBE0A7C11123959310&steamid={user_id}&format=json"
    response = requests.get(url)
    json_response = response.json()
    game_count = json_response["response"]["game_count"]
    return game_count


@app.get('/login')
async def main(steam_signin: SteamSignIn = Depends(SteamSignIn)):
    url = steam_signin.ConstructURL(api_url+'/processlogin')
    return steam_signin.RedirectUser(url)


@app.get('/processlogin')
async def pr(request: Request, steam_signin: SteamSignIn = Depends(SteamSignIn)):
    return steam_signin.ValidateResults(request.query_params)

@app.post("/games/test")
def get_test():
    result = []
    already_play = []
    # 신규 게임 5개 가져오기

    # 무작위 30개 가져오기
    random_game = games.aggregate([
        { "$match": { "appid": { "$nin": already_play } } },
        { "$sample": { "size": 60 } },
        { "$project": { "_id": 0, "appid":1, "name": 1, "price": 1, "image": 1  } }
    ])

    for game in random_game:
        result.append(game)

    return result


@app.post("/games/all")
def get_all_game(preference: list):
    """선호도에 게임 리스트 출력
    1) 이미 플레이한 게임은 나오지 않음.

    2) 게임 기록이 5개 미만 사용자 = preference 리스트 길이가 0
    → 총 60개 (사용자 정보 기반 추천 게임 30개, 무작위 15개, 인기순위 10개, 신규게임 5개)

    3) 게임 기록이 5개 이상 사용자 = preference 리스트 길이가 0보다 큼
    → 총 60개 (무작위 30개, 인기순위 25개, 신규게임 5개)

    Args:
        preference : 선호 장르 리스트

    Returns:
        60개의 게임 리스트 (appid, image, name)
    """
    result = []
    already_selected = [] # 이미 플레이한 게임 담기
    # 신규 게임 5개 가져오기

    # 무작위 30개 가져오기
    random_game = games.aggregate([
        { "$match": { "appid": { "$nin": already_selected } } },
        { "$sample": { "size": 30 } },
        { "$project": { "_id": 0, "appid":1, "name": 1, "price": 1, "image": 1  } }
    ])

    for game in random_game:
        result.append(game)
        already_selected.append(game["appid"])

    # 인기순위 25개 가져오기


    if(len(preference) != 0): # 게임 기록이 5개 이상인 사용자
        # 추천 게임 30개 가져오기
        print("Yes Data")
        
        # 무작위 15개 컷

        # 인기순위 10개 컷


    else: # 게임 기록이 5개 미만인 사용자
        print("No Data")

    return result

# 5개 이상 플레이한 사용자가 전에 했던 게임 기반으로 (태그) 분석


@app.get("/games/result/{userid}")
def get_game_by_tag():
    return {"Hello": "World"}

# 5개 미만 플레이한 사용자의 장바구니 기반으로 (태그) 분석


@app.get("/games/result")
def get_game_by_table(table_list: str):
    return {"Hello": "World"}

# 뽑은 게임 리스트에 대한 매치율 저장


@app.post("/games/rate")
def get_rate(preference: list,
             games: list):
    result = recommend_game.get_result(preference, games)
    return result

# 뽑은 리스트랑 비슷한 거 추천


@app.get("/games/similar")
def get_similar_game():

    return {"Hello": "World"}


@app.get("/games/detail/{appid}")
def get_game_detail(appid: str):
    """게임 상세 정보 반환 함수.

    Args:
        appid : 게임의 앱 아이디

    Returns:
        제목, 가격, 스크린샷, 짧은 설명, 개발사, 출시일, 장르, 카테고리
    """
    result = {}
    
    # DB 조회
    get_game = games.find_one({"appid":appid},{"_id":0, "recommendations":0, "metacritic":0, "about_the_game":0})

    # categories, genres, screenshots, developers 리스트화
    get_game["categories"] = get_game["categories"].split(",")
    get_game["genres"] = get_game["genres"].split(",")
    get_game["screenshots"] = get_game["screenshots"].split(",")
    get_game["developers"] = get_game["developers"].split("///")

    result["data"] = get_game

    return result

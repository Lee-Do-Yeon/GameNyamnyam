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

# CORS 설정
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

# env
load_dotenv()
mongodb_root = os.environ.get('mongodb_root')
steam_key = os.getenv('steam_key')

# mongoDB 연결
mongodb_URI = f"mongodb+srv://root:{mongodb_root}@gamenyamnaym.t2iixnv.mongodb.net/test"
client = MongoClient(mongodb_URI) # DB 연결
db = client['nyamnyam'] # DB 접근
games = db['game']# Collection 접근

api_url = "http://127.0.0.1:8000"

@app.get('/login')
async def main(steam_signin: SteamSignIn = Depends(SteamSignIn)):
    url = steam_signin.ConstructURL(api_url+'/processlogin')
    return steam_signin.RedirectUser(url)


@app.get('/processlogin')
async def pr(request: Request, steam_signin: SteamSignIn = Depends(SteamSignIn)):
    return steam_signin.ValidateResults(request.query_params)

@app.get("/games/{steamId}")
async def get_game_count(steamId: str):
    """소유한 게임 개수 반환 함수.

    Args:
        steamId : 사용자 고유 식별번호.

    Returns:
        소유한 게임 개수
    """
    url = f"https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={steam_key}&steamid={steamId}&format=json"
    response = requests.get(url)
    json_response = response.json()
    game_count = json_response["response"]["game_count"]
    return game_count

@app.post("/games/test")
def get_test():
    result = []
    already_play = []
    # 신규 게임 5개 가져오기

    # 무작위 30개 가져오기
    random_game = games.aggregate([
        {"$match": {"appid": {"$nin": already_play}}},
        {"$sample": {"size": 60}},
        {"$project": {"_id": 0, "appid": 1, "name": 1, "price": 1, "image": 1}}
    ])

    for game in random_game:
        result.append(game)

    return result


@app.post("/games/all")
def get_all_game(steamId: str, preference: list):
    """선호도에 게임 리스트 출력
    1) 이미 플레이한 게임은 나오지 않음.

    2) 게임 기록이 5개 미만 사용자 = preference 리스트 길이가 0
    → 총 60개 (사용자 정보 기반 추천 게임 30개, 무작위 15개, 인기순위 10개, 신규게임 5개)

    3) 게임 기록이 5개 이상 사용자 = preference 리스트 길이가 0보다 큼
    → 총 60개 (무작위 30개, 인기순위 25개, 신규게임 5개)

    Args:
        steamId : 사용자 고유 식별 아이디

    Returns:
        60개의 게임 리스트 (appid, image, name)
    """

    result = {}
    result["data"] = []
    random_game = []
    popular_game = []
    already_selected = [] # 이미 플레이한 게임 담기

    # 신규 게임 5개 가져오기
    latest_game = games.aggregate([
        { "$sort": { "release_date": -1 } },
        { "$match": { "appid": { "$nin": already_selected } } },
        { "$limit": 30 },
        { "$sample": { "size": 5 } },
        { "$project": { "_id": 0, "appid":1, "name": 1, "price": 1, "image": 1  } }
    ])

    for game in latest_game:
        result["data"].append(game)
        already_selected.append(game["appid"])
    

    # 무작위 30개 가져오기
    random_game_cur = games.aggregate([
        { "$match": { "appid": { "$nin": already_selected } } },
        { "$sample": { "size": 30 } },
        { "$project": { "_id": 0, "appid":1, "name": 1, "price": 1, "image": 1  } }
    ])

    for game in random_game_cur:
        random_game.append(game)
        already_selected.append(game["appid"])

    # 인기순위 25개 가져오기
    popular_game_cur = games.aggregate([
        { "$sort": { "recommendations": -1 } },
        { "$match": { "appid": { "$nin": already_selected } } },
        { "$limit": 100 },
        { "$sample": { "size": 25 } },
        { "$project": { "_id": 0, "appid":1, "name": 1, "price": 1, "image": 1  } }
    ])
  
    for game in popular_game_cur:
        popular_game.append(game)
        already_selected.append(game["appid"])

    if(len(preference) != 0): # 게임 기록이 5개 이상인 사용자
        # 추천 게임 30개 가져오기 (★★★★추가하기★★★★)
        print("Yes Data")

        # 무작위 15개 컷
        #result["data"].extend(random_game[:16])

        # 인기순위 10개 컷
        #result["data"].extend(popular_game[:11])

        result["data"].extend(random_game)
        result["data"].extend(popular_game)

    else: # 게임 기록이 5개 미만인 사용자
        print("No Data")

        result["data"].extend(random_game)
        result["data"].extend(popular_game)
    
    #print(len(result["data"]))
    return result


@app.get("/games/result/{steamId}")
def get_game_by_tag(steamId: str):
    """ 5개 이상 플레이한 사용자가 전에 했던 게임 기반으로 태그 분석

    Args:
        steamId : 유저 아이디

    Returns:
        전에 플레이했던 장르 중 가장 많은 태그 5개

    """

    # 1. 플레이했던 게임 정보(appid) 불러오기
    playedGames = {}
    appids = []
    playedGenres = []
    result = {}
    url = f"https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key={steam_key}&steamid={steamId}"
    response = requests.get(url)
    json_response = response.json()
    playedGames = json_response["response"]["games"]

    for k in playedGames:
        appids.append(k['appid'])

    # 2. 불러온 appid를 이용해 db에서 game detail 가져오기
    print(appids)
    for k in appids:
        playedGenres.append(games.find_one({"appid": str(k)}, {
            "_id": 0, "genres": 1}))

    # 3. game detail list에서 장르 뽑아서 5개 가져오기
    result = recommend_game.get_preference(playedGenres)

    return result

@app.post("/games/result")
def get_game_by_table(table_list: list):
    """ 5개 미만 플레이한 사용자의 장바구니 기반으로 (태그) 분석

    Args:
        steamId : 유저 아이디

    Returns:
        전에 플레이했던 장르 중 가장 많은 태그 5개

    """
    # 1. 불러온 appid를 이용해 db에서 game detail 가져오기
    playedGenres = []
    result = {}

    for k in table_list:
        playedGenres.append(games.find_one({"appid": k}, {
            "_id": 0, "genres": 1}))

    # 3. game detail list에서 장르 뽑아서 5개 가져오기
    result = recommend_game.get_preference(playedGenres)

    return result

@app.post("/games/rate")
def get_rate(preference: list,
             games: list):
    """뽑은 게임 리스트에 대한 매치율 저장

    Args:
        games : 게임의 앱 아이디가 담긴 리스트
        preference : 선호 장르 리스트

    Returns:
        비슷한 게임들의 앱아이디, 제목, 이미지
    """
    result = recommend_game.get_result(preference, games)
    return result


@app.post("/games/similar")
def get_similar_game(games: list):
    """비슷한 게임 추천.

    Args:
        games : 게임의 앱 아이디가 담긴 리스트

    Returns:
        비슷한 게임들의 앱아이디, 제목, 이미지
    """
    result = {}
    result["data"] = []

    # ★★★★추가하기★★★★

    return result


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
    get_game = games.find_one({"appid": appid}, {
                              "_id": 0, "recommendations": 0, "metacritic": 0, "about_the_game": 0})

    # categories, genres, screenshots, developers 리스트화
    get_game["categories"] = get_game["categories"].split(",")
    get_game["genres"] = get_game["genres"].split(",")
    get_game["screenshots"] = get_game["screenshots"].split(",")
    get_game["developers"] = get_game["developers"].split("///")

    result["data"] = get_game

    return result

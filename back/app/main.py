import requests
from fastapi import FastAPI, Depends
from starlette.requests import Request
from steamsignin import SteamSignIn
from recommend import recommend_game
from typing import List

app = FastAPI()
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
# 규칙에 따른 추천 게임 리스트 (인기 게임 몇 개, 사용자 리스트 기반 몇 개 ...)


@app.get("/games/all")
def get_all_game():
    return {"Hello": "World"}

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


@app.get("/games/{appid}")
def get_game_detail():
    """게임 상세 정보 반환 함수.

    Args:
        appid : 게임의 앱 아이디

    Returns:
        제목, 가격, 스크린샷, 짧은 설명, 개발사, 출시일, 장르, 카테고리
    """
    
    # TO DO : DB 조회


    # 임시 데이터...
    result = {"data":{
                    "name" : "Raft",
                    "short_description" : "Raft throws you and your friends into an epic oceanic adventure! Alone or together, players battle to survive a perilous voyage across a vast sea! Gather debris, scavenge reefs and build your own floating home, but be wary of the man-eating sharks!",
                    "price" : 21000,
                    "categories" : "싱글 플레이어,멀티플레이어,협동,온라인 협동,Steam 도전 과제,Steam Cloud", # 구분자 ','
                    "genres" : "어드벤처,인디,시뮬레이션", # 구분자 ','
                    "release_date" : "2022-06-20",
                    "developers" : "Redbeet Interactive", # 구분자 '///'
                    "screenshots" : "https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_c22b2ff5ba5609f74e61b5feaa5b7a1d7fd1dbd3.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_2adb248f4d501cf58344d9af1d8a9e56c74647ee.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_56914c026da8c8411974bd0e2e8cb81a0331ba99.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_ef26440dc87e4d571139f5c64a22035d86723442.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_dddecb78ba5ae9eecbe17a22f09f5281609d63a0.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_594b5fab052123e5f96088df3ec3c9b7cec62e88.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_7e366c948ed3847f33693cebd23aaaf6458cbf46.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_e5d26eea3a2e068518095a9596380ab384da6e80.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_0e062ec493bba26edaf0f7e6a6e815e713e694b5.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_c885b2df8492951552fe4ef00ca23a81321f0bb3.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_fddb32f91f59dc076b60eebf6d013fc9a636e0e1.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_d1ab60ade693c7ce90bcd0ba5400f8ea39e73edb.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_363d79b1d6da0ec6dbccdff1c1f07e189664965a.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_fdf998ea2eca1e79c0141b83ef32c5fadecd9a0e.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_189ac1fa4505a10365bcf9c0c3ba61e7a618ae0f.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_b327651cc0fdd24615b5e9e4f71f53f032ab712a.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_9784377e0e3bcfd2be609721326ab336a39c34b8.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_c2cf9eaa982cdf83d4aecd67626f6684cdd2ea2f.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_4ef5feab40a770daca055a1a446ad3f9ba8fc50c.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_7f3903e7a34e8992e12449f168744315a4e2cd49.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_df564f8e61a046e6512b1900aacd8802274c183d.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_ce675c9e2bee34a08c6e2f0c8357354bcd4e5f1d.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_02579aefd100d68c82bd06d2de05bfb915214266.1920x1080.jpg?t=1655744208,https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_79738b5ac475030ea583aea92b487f73c7e02572.1920x1080.jpg?t=1655744208" # 구분자 ','
                }
              }
    
    return result

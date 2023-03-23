from fastapi import FastAPI


app = FastAPI()


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


@app.get("/games/rate")
def get_rate():
    return {"Hello": "World"}

# 뽑은 리스트랑 비슷한 거 추천


@app.get("/games/similar")
def get_similar_game():

    return {"Hello": "World"}

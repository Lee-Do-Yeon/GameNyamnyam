from fastapi import FastAPI
from fastapi.responses import JSONResponse
from mongoengine import connect
from openpyxl import load_workbook
import models
import json

app = FastAPI()
# db 연동
connect(db="nyamnyam", host="localhost", port=27017)

@app.get("/")
def read_root():
    return {"Hello": "World"}

# 저장된 game 데이터 전체 가져오기
@app.get("/get_game")
def get_all_game():
    # 객체 가져오기
    games = models.Game.objects()
    # return list(games)

    # json으로 형변환 후 return
    games_json = games.to_json()
    return JSONResponse(json.loads(games_json))

# 엑셀파일 불러와서 데이터 넣기
@app.get("/insert_excel")
def excel_to_db():
    print("insert data...")

    # 엑셀파일 열기
    excel_filename = "./game_data_50000.xlsx"
    wb = load_workbook(excel_filename)
    ws = wb.active

    for x in range(2, ws.max_row):
        # 엑셀 파일에서 하나씩 데이터 뽑아오기
        appid = ws.cell(row=x, column=2).value
        name = str(ws.cell(row=x,column=3).value)
        short_description = str(ws.cell(row=x,column=4).value)
        price = ws.cell(row=x, column=5).value
        categories = ws.cell(row=x, column=6).value
        genres = ws.cell(row=x, column=7).value
        recommendations = ws.cell(row=x,column=8).value
        release_date = ws.cell(row=x, column=9).value
        developers = str(ws.cell(row=x, column=10).value)
        metacritic = ws.cell(row=x, column=11).value
        image = str(ws.cell(row=x, column=12).value)
        about_the_game = str(ws.cell(row=x, column=13).value)
        screenshots = str(ws.cell(row=x, column=14).value)

        # str split -> 리스트로 변환 
        categories_list = categories.split(",")
        genres_list = genres.split(",")

        g = models.Game(appid=appid, name=name, short_description=short_description,price=price,recommendations=recommendations,release_date=release_date,developers=developers,metacritic=metacritic,image=image,about_the_game=about_the_game,screenshots=screenshots)
        g.categories = categories_list
        g.genres = genres_list

        g.save() # 저장하기
        



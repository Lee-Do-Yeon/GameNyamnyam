from fastapi import FastAPI
import requests

app = FastAPI()


@app.get("/games/{game_id}")
async def get_game_info(game_id: int):
    url = f"https://store.steampowered.com/api/appdetails?appids={game_id}"
    response = requests.get(url)
    json_response = response.json()
    game_info = json_response[str(game_id)]["data"]
    return game_info

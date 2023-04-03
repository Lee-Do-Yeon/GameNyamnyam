from fastapi import APIRouter, Depends
from steamsignin import SteamSignIn
from starlette.requests import Request
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from api.api import api_router

app = FastAPI(
    title="Game Nyamnyam API"
)

# CORS 설정
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


api_url = "https://j8c204.p.ssafy.io/api/login"


@app.get('/api/login/')
async def main(steam_signin: SteamSignIn = Depends(SteamSignIn)):
    url = steam_signin.ConstructURL(api_url+'/processlogin')
    return steam_signin.RedirectUser(url)


@app.get('/api/login/processlogin')
async def pr(request: Request, steam_signin: SteamSignIn = Depends(SteamSignIn)):
    return steam_signin.ValidateResults(request.query_params)

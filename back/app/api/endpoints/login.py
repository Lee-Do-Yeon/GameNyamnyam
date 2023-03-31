from starlette.requests import Request
from steamsignin import SteamSignIn
from fastapi import APIRouter, Depends

router = APIRouter()

# api_url = "https://127.0.0.1:8000"
api_url = "https://j8c204.p.ssafy.io"


@router.get('/')
async def main(steam_signin: SteamSignIn = Depends(SteamSignIn)):
    url = steam_signin.ConstructURL(api_url+'/processlogin')
    return steam_signin.RedirectUser(url)


@router.get('/processlogin')
async def pr(request: Request, steam_signin: SteamSignIn = Depends(SteamSignIn)):
    return steam_signin.ValidateResults(request.query_params)

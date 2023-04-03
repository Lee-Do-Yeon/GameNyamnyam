from starlette.requests import Request
from steamsignin import SteamSignIn
from fastapi import APIRouter, Depends

router = APIRouter()

api_url = "https://j8c204.p.ssafy.io/api/login"


@router.get('/')
async def main(steam_signin: SteamSignIn = Depends(SteamSignIn)):
    url = steam_signin.ConstructURL(api_url+'/processlogin')
    a = steam_signin.RedirectUser(url)
    print(a)
    return a


@router.get('/processlogin')
async def pr(request: Request, steam_signin: SteamSignIn = Depends(SteamSignIn)):
    return steam_signin.ValidateResults(request.query_params)

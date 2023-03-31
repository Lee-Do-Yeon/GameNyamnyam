from starlette.requests import Request
from steamsignin import SteamSignIn
from fastapi import APIRouter, Depends

router = APIRouter()

api_url = "https://j8c204.p.ssafy.io"


@router.get('/')
async def main(steam_signin: SteamSignIn = Depends(SteamSignIn)):
    url = steam_signin.ConstructURL(api_url+'/processlogin')
    print(url)
    return steam_signin.RedirectUser(url)


@router.get('/processlogin')
async def pr(request: Request, steam_signin: SteamSignIn = Depends(SteamSignIn)):
    print("하이")
    return steam_signin.ValidateResults(request.query_params)

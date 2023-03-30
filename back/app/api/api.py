from fastapi import APIRouter

from api.endpoints import games, login

api_router = APIRouter()

api_router.include_router(games.router, prefix="/games", tags=["games"])
api_router.include_router(login.router, prefix="/login", tags=["login"])

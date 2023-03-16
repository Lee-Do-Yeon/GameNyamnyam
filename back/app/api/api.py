from fastapi import APIRouter

from app.api.endpoints import games

api_router = APIRouter()

api_router.include_router(games.router, prefix="/games", tags=["games"])
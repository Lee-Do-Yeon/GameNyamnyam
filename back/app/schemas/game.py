from pydantic import BaseModel
from typing import Optional

# Shared properties
class GameBase(BaseModel):
    appid: str
    name: str
    price: int
    image: str

class GameDetail(GameBase):
    categories: list[str]
    genres: list[str]
    screenshots: Optional[list[str]] = None
    developers: list[str]
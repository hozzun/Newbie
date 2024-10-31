from pydantic import BaseModel
from app.schemas.player import PlayerBase
from app.schemas.team import TeamBase
from typing import List

class LineupBase(BaseModel):
    batting_order: str
    war: str
    player: PlayerBase
    
    class Config:
        from_attributes = True
        

class LineupResponse(BaseModel):
    game_id: int
    date: str
    stadium: str
    home_team: str
    away_team: str
    home_lineup: List[LineupBase]
    away_lineup: List[LineupBase]
    
    class Config:
        from_attributes = True
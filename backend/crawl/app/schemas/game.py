from pydantic import BaseModel
from app.schemas.team import TeamBase

class GameBase(BaseModel):
    id: int
    date: str
    time: str
    away_score: str
    home_score: str
    game_result: str
    stadium: str
    season: str
    
    away_team: TeamBase
    home_team: TeamBase
    
    class Config:
        from_attributes = True
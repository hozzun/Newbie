from typing import Optional
from pydantic import BaseModel
from app.schemas.team import TeamBase

class PlayerBase(BaseModel):
    id: int
    name: str
    back_number: Optional[str] = None
    position: Optional[str] = None
    birth: Optional[str] = None
    physical: Optional[str] = None
    academic: Optional[str] = None
    team: Optional[TeamBase] = None
    
    class Config:
        from_attributes = True
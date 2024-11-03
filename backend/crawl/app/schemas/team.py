from pydantic import BaseModel
from typing import Optional

class TeamBase(BaseModel):
    id: int
    team_name: str
    team_logo: Optional[str] = None
    
    class Config:
        from_attributes = True
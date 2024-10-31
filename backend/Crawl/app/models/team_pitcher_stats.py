from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.models.database import Base


class TeamPitcherStats(Base):
    __tablename__ = "team_pitcher_stats"

    id = Column(Integer, primary_key=True, index=True)
    rank = Column(Integer)
    year = Column(String(10))
    team_id = Column(Integer, ForeignKey("team.id"))
    era = Column(String(10))
    game_count = Column(Integer)
    win = Column(Integer)
    lose = Column(Integer)
    save = Column(Integer)
    hld = Column(Integer)
    wpct = Column(String(10))
    ip = Column(String(10))
    h = Column(Integer)
    hr = Column(Integer)
    bb = Column(Integer)
    hbp = Column(Integer)
    so = Column(Integer)
    r = Column(Integer)
    er = Column(Integer)
    whip = Column(String(10))
    
    team = relationship("Team", back_populates="team_pitcher_stats")
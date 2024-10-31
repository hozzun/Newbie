from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.models.database import Base


class HitterStats(Base):
    __tablename__ = "hitter_stats"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(String(10))
    player_id = Column(Integer, ForeignKey("player.id"))
    team_id = Column(Integer, ForeignKey("team.id"))
    avg = Column(String(10))
    game_count = Column(Integer)
    pa = Column(Integer)
    ab = Column(Integer)
    r = Column(Integer)
    h = Column(Integer)
    two = Column(Integer)
    three = Column(Integer)
    homerun = Column(Integer)
    tb = Column(Integer)
    rbi = Column(Integer)
    sac = Column(Integer)
    sf = Column(Integer)
    
    player = relationship("Player", back_populates="hitter_stats")
    team = relationship("Team", back_populates="hitter_stats")
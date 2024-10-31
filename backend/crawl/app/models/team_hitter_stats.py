from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.models.database import Base


class TeamHitterStats(Base):
    __tablename__ = "team_hitter_stats"

    id = Column(Integer, primary_key=True, index=True)
    rank = Column(Integer)
    year = Column(String(10))
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
    
    team = relationship("Team", back_populates="team_hitter_stats")
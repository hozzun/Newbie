from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.models.database import Base


class Rank(Base):
    __tablename__ = "rank"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(String(10))
    rank = Column(Integer)
    team_id = Column(Integer, ForeignKey("team.id"))
    game_count = Column(Integer)
    win_count = Column(Integer)
    lose_count = Column(Integer)
    draw_count = Column(Integer)
    win_rate = Column(String(10))
    game_diff = Column(String(10))
    recent_10 = Column(String(20))
    streak = Column(String(10))
    rank_change = Column(Integer)
    
    team = relationship("Team", back_populates="rank")
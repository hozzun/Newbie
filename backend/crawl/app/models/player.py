from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.database import Base


class Player(Base):
    __tablename__ = "player"

    id = Column(Integer, primary_key=True, index=True)
    back_number = Column(String(10))
    name = Column(String(10))
    team_id = Column(Integer, ForeignKey("team.id"))
    position = Column(String(10))
    birth = Column(String(10))
    physical = Column(String(20))
    academic = Column(String(50))
    
    team = relationship("Team", back_populates="players")
    hitter_stats = relationship("HitterStats", back_populates="player")
    pitcher_stats = relationship("PitcherStats", back_populates="player")
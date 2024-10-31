from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from app.models.database import Base


class Team(Base):
    __tablename__ = "team"

    id = Column(Integer, primary_key=True, index=True)
    team_name = Column(String(10))
    team_logo = Column(Text)
    
    players = relationship("Player", back_populates="team")
    home_games = relationship("Game", foreign_keys="Game.home_team_id", back_populates="home_team")
    away_games = relationship("Game", foreign_keys="Game.away_team_id", back_populates="away_team")
    rank = relationship("Rank", uselist=False, back_populates="team")
    team_hitter_stats = relationship("TeamHitterStats", back_populates="team")
    team_pitcher_stats = relationship("TeamPitcherStats", back_populates="team")
    hitter_stats = relationship("HitterStats", back_populates="team")
    pitcher_stats = relationship("PitcherStats", back_populates="team")
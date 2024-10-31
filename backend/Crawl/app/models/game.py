from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.database import Base


# 경기 일정 테이블 정의
class Game(Base):
    __tablename__ = "game"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String(10))
    time = Column(String(10))
    away_team_id = Column(Integer, ForeignKey("team.id"))
    home_team_id = Column(Integer, ForeignKey("team.id"))
    away_score = Column(Integer)
    home_score = Column(Integer)
    game_result = Column(String(10))
    stadium = Column(String(10))
    season = Column(String(10))
    
    home_team = relationship("Team", foreign_keys=[home_team_id], back_populates="home_games")
    away_team = relationship("Team", foreign_keys=[away_team_id], back_populates="away_games")
    lineup = relationship("Lineup", back_populates="game")
    game_records = relationship("GameRecord", back_populates="game")
from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.models.database import Base

class GameRecord(Base):
    __tablename__ = "game_record"

    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer, ForeignKey("game.id"))
    inning_count = Column(Integer)
    stadium = Column(String(50))
    crowd = Column(String(20))
    start_time = Column(String(10))
    end_time = Column(String(20))
    run_time = Column(String(20))

    away_score = Column(JSON, nullable=True)
    home_score = Column(JSON, nullable=True)
    
    away_run = Column(String(10), nullable=True)
    away_hit = Column(String(10), nullable=True)
    away_error = Column(String(10), nullable=True)
    away_base_on_balls = Column(String(10), nullable=True)
    home_run = Column(String(10), nullable=True)
    home_hit = Column(String(10), nullable=True)
    home_error = Column(String(10), nullable=True)
    home_base_on_balls = Column(String(10), nullable=True)
    
    away_starting_pitcher = Column(String(50), nullable=True)
    home_starting_pitcher = Column(String(50), nullable=True)
    winning_hit = Column(JSON, nullable=True)
    home_runs = Column(JSON, nullable=True)
    doubles = Column(JSON, nullable=True)
    triples = Column(JSON, nullable=True)
    errors = Column(JSON, nullable=True)
    stolen_bases = Column(JSON, nullable=True)
    caught_stealing = Column(JSON, nullable=True)
    double_plays = Column(JSON, nullable=True)
    wild_pitches = Column(JSON, nullable=True)
    umpires = Column(JSON, nullable=True)

    # Game 테이블과 관계 설정
    game = relationship("Game", back_populates="game_records")

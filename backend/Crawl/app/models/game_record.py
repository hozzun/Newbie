from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.models.database import Base

class GameRecord(Base):
    __tablename__ = "game_record"

    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer, ForeignKey("game.id"))
    stadium = Column(String(50))
    crowd = Column(String(20))
    start_time = Column(String(10))
    end_time = Column(String(20))
    run_time = Column(String(20))

    # 팀 점수 (이닝별 점수 JSON 저장)
    away_score = Column(JSON, nullable=True)  # 원정팀 점수
    home_score = Column(JSON, nullable=True)  # 홈팀 점수

    # 선발 투수
    away_starting_pitcher = Column(String(50), nullable=True)  # 원정팀 선발 투수
    home_starting_pitcher = Column(String(50), nullable=True)  # 홈팀 선발 투수

    # 경기 세부 사항 (각 필드별 JSON 저장)
    winning_hit = Column(JSON, nullable=True)
    home_runs = Column(JSON, nullable=True)
    doubles = Column(JSON, nullable=True)
    errors = Column(JSON, nullable=True)
    stolen_bases = Column(JSON, nullable=True)
    caught_stealing = Column(JSON, nullable=True)
    double_plays = Column(JSON, nullable=True)
    wild_pitches = Column(JSON, nullable=True)
    umpires = Column(JSON, nullable=True)

    # Game 테이블과 관계 설정
    game = relationship("Game", back_populates="game_records")

from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.models.database import Base


class Lineup(Base):
    __tablename__ = "lineup"

    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer, ForeignKey("game.id"))
    team_id = Column(Integer, ForeignKey("team.id"))
    player_id = Column(Integer, ForeignKey("player.id"))
    batting_order = Column(Integer)
    position = Column(String(10))
    war = Column(String(10))
    
    game = relationship("Game", back_populates="lineup")
    team = relationship("Team", foreign_keys=[team_id])
    player = relationship("Player", foreign_keys=[player_id])
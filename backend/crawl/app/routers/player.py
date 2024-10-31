from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.models import SessionLocal, Player

router = APIRouter()

# DB 세션
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 1. DB 전체 선수 조회
@router.get("/players")
def get_player(db: Session = Depends(get_db)):
    players = db.query(Player).all()
    if not players:
        # 데이터가 없을 경우 404 에러 반환
        raise HTTPException(status_code=404, detail="선수가 존재하지 않습니다.")
    return players

# 2. 해당 선수 조회
@router.get("/players/{id}")
def get_player(id: int, db: Session = Depends(get_db)):
    player = db.query(Player).filter(Player.id == id).all()
    if not player:
        return {"message": f"No player found {id}"}
    return player

# 3. 팀 별 선수 조회
@router.get("/players/{team}")
def get_players_by_team(team: str, db: Session = Depends(get_db)):
    players = db.query(Player).filter(Player.team == team).all()
    if not players:
        return {"message": f"No players found for team {team}"}
    return players

# 4. 팀&포지션별 선수 조회
@router.get("/players/{team}/{position}")
def get_players_by_position(team: str, position: str, db: Session = Depends(get_db)):
    players = db.query(Player).filter(Player.team == team, Player.position == position).all()
    if not players:
        return {"message": f"No players found for team {team} and {position}"}
    return players
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.models import SessionLocal, Rank

router = APIRouter()

# DB 세션
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 1. DB 전체 선수 조회
@router.get("/rank")
def get_player(db: Session = Depends(get_db)):
    rank = db.query(Rank).all()
    if not rank:
        # 데이터가 없을 경우 404 에러 반환
        raise HTTPException(status_code=404, detail="팀 순위가 존재하지 않습니다.")
    return rank
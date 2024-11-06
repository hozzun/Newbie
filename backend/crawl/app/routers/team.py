# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from app.models import SessionLocal, Team

# router = APIRouter()

# # DB 세션
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# @router.get("/teams")
# def get_teams(db: Session = Depends(get_db)):
#     teams = db.query(Team).all()
#     if not teams:
#         # 데이터가 없을 경우 404 에러 반환
#         raise HTTPException(status_code=404, detail="팀 데이터가 존재하지 않습니다.")
#     return teams

# @router.get("/teams/{id}")
# def get_team_id(id: int, db: Session = Depends(get_db)):
#     team = db.query(Team).filter(Team.id == id).all()
#     if not team:
#         return {"message": f"No team found {id}"}
#     return team
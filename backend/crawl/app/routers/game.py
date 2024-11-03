# from fastapi import APIRouter, Depends, HTTPException, Query
# from sqlalchemy.orm import Session, joinedload
# from typing import List
# from app.models import SessionLocal, Game, Lineup, Player
# from app.schemas.game import GameBase
# from app.schemas.team import TeamBase
# from app.schemas.player import PlayerBase
# from app.schemas.lineup import LineupResponse, LineupBase

# router = APIRouter()

# # DB 세션
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# # # 1. DB 전체 경기일정 및 결과 조회
# # @router.get("/games", response_model=List[GameBase])
# # def get_game(db: Session = Depends(get_db)):
# #     games = db.query(Game).all()
# #     if not games:
# #         # 데이터가 없을 경우 404 에러 반환
# #         raise HTTPException(status_code=404, detail="경기 일정이 존재하지 않습니다.")
# #     return games


# # # 2. 특정 연도, 월, 일에 대한 경기 일정 조회
# # @router.get("/games/date", response_model=List[GameBase])
# # def get_game_by_date(
# #     year: int = Query(..., description="조회할 연도"),
# #     month: int = Query(None, description="조회할 월 (선택)"),
# #     day: int = Query(None, description="조회할 일 (선택)"),
# #     db: Session = Depends(get_db)
# # ):
# #     try:
# #         # 조건별로 쿼리 필터링
# #         query = db.query(Game)

# #         # 연도 필터 추가
# #         if year:
# #             query = query.filter(Game.date.like(f"{year}-%"))

# #         # 월 필터 추가
# #         if month:
# #             month_str = f"{month:02d}"  # 1월 -> '01'로 포맷팅
# #             query = query.filter(Game.date.like(f"{year}-{month_str}-%"))

# #         # 일 필터 추가
# #         if day:
# #             day_str = f"{day:02d}"  # 1일 -> '01'로 포맷팅
# #             query = query.filter(Game.date == f"{year}-{month_str}-{day_str}")

# #         # 최종 결과 조회
# #         games = query.all()

# #         if not games:
# #             raise HTTPException(status_code=404, detail="해당 날짜에 경기가 없습니다.")

# #         return games

# #     except Exception as e:
# #         raise HTTPException(status_code=500, detail=f"{str(e)}")
    
# # # 해당 경기 정보 및 선발 라인업
# # @router.get("/games/{game_id}/lineup", response_model=LineupResponse)
# # def get_game_lineup(game_id: int, db: Session = Depends(get_db)):
# #     # 게임 정보 가져오기
# #     game = db.query(Game).options(
# #         joinedload(Game.home_team),
# #         joinedload(Game.away_team)
# #     ).filter(Game.id == game_id).first()

# #     if not game:
# #         raise HTTPException(status_code=404, detail="해당 게임을 찾을 수 없습니다.")

# #     # 홈팀 라인업 조회
# #     home_lineup_entries = db.query(Lineup).options(
# #         joinedload(Lineup.player).joinedload(Player.team),
# #         joinedload(Lineup.team)
# #     ).filter(
# #         Lineup.game_id == game_id,
# #         Lineup.team_id == game.home_team_id
# #     ).order_by(Lineup.batting_order).all()

# #     # 원정팀 라인업 조회
# #     away_lineup_entries = db.query(Lineup).options(
# #         joinedload(Lineup.player).joinedload(Player.team),
# #         joinedload(Lineup.team)
# #     ).filter(
# #         Lineup.game_id == game_id,
# #         Lineup.team_id == game.away_team_id
# #     ).order_by(Lineup.batting_order).all()

# #     # 홈팀 라인업 데이터 구성
# #     home_lineup = [
# #         LineupBase(
# #             batting_order=entry.batting_order,
# #             war=entry.war,
# #             player=PlayerBase(
# #                 id=entry.player.id,
# #                 name=entry.player.name,
# #                 back_number=entry.player.back_number,
# #                 position=entry.player.position,
# #                 birth=entry.player.birth,
# #                 physical=entry.player.physical,
# #                 academic=entry.player.academic,
# #                 team=TeamBase(id=entry.player.team.id, team_name=entry.player.team.team_name, team_logo=entry.player.team.team_logo)
# #             )
# #         )
# #         for entry in home_lineup_entries
# #     ]

# #     # 원정팀 라인업 데이터 구성
# #     away_lineup = [
# #         LineupBase(
# #             batting_order=entry.batting_order,
# #             war=entry.war,
# #             player=PlayerBase(
# #                 id=entry.player.id,
# #                 name=entry.player.name,
# #                 back_number=entry.player.back_number,
# #                 position=entry.player.position,
# #                 birth=entry.player.birth,
# #                 physical=entry.player.physical,
# #                 academic=entry.player.academic,
# #                 team=TeamBase(id=entry.player.team.id, team_name=entry.player.team.team_name, team_logo=entry.player.team.team_logo)
# #             )
# #         )
# #         for entry in away_lineup_entries
# #     ]

# #     # 응답 데이터 구성
# #     response = LineupResponse(
# #         game_id=game.id,
# #         date=game.date,
# #         stadium=game.stadium,
# #         home_team=game.home_team.team_name,
# #         away_team=game.away_team.team_name,
# #         home_lineup=home_lineup,
# #         away_lineup=away_lineup
# #     )

# #     return response

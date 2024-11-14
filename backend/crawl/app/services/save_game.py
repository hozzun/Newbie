import redis
import json
from sqlalchemy.orm import Session
from app.models import Game, Team, SessionLocal

# Redis 클라이언트 설정
# redis_client = redis.Redis(host='k11b304.p.ssafy.io', port=6379, db=0)
redis_client = redis.Redis(host='localhost', port=6379, db=0)

def save_game_to_db(game_list):
    if not game_list:
        print("저장할 게임 데이터가 없습니다.")
        return

    db: Session = SessionLocal()
    try:
        for game in game_list:
            if game['away_team'] == "SK":
                game['away_team'] = "SSG"
            elif game['home_team'] == "SK":
                game['home_team'] = "SSG"
                
            # 팀 이름으로 팀 객체 조회
            away_team_obj = db.query(Team).filter_by(team_name=game['away_team']).first()
            home_team_obj = db.query(Team).filter_by(team_name=game['home_team']).first()
            
            if away_team_obj is None or home_team_obj is None:
                print(f"팀 정보를 찾을 수 없습니다: {game['away_team']}, {game['home_team']}")
                continue  # 팀 정보를 찾을 수 없으면 다음 게임으로 넘어감
            
            # 팀 ID를 game 딕셔너리에 추가
            game['away_team_id'] = away_team_obj.id
            game['home_team_id'] = home_team_obj.id
            
            game['away_score'] = int(game['away_score'])
            game['home_score'] = int(game['home_score'])
            
            # 동일한 날짜와 팀의 경기 정보가 있는지 확인
            existing_game = db.query(Game).filter_by(
                date=game["date"],
                time=game["time"],
                away_team_id=game["away_team_id"],
                home_team_id=game["home_team_id"]
            ).first()
            
            redis_key = f"game:{game['date']}:{game['time']}:{game['away_team_id']}:{game['home_team_id']}"

            # 이미 존재하는 경기라면 업데이트
            if existing_game:
                if (existing_game.game_result != game["game_result"] or
                        existing_game.away_score != game["away_score"] or
                        existing_game.home_score != game["home_score"]):
                    # 게임 결과나 스코어가 다르면 업데이트
                    existing_game.away_score = game["away_score"]
                    existing_game.home_score = game["home_score"]
                    existing_game.game_result = game["game_result"]
                    existing_game.stadium = game["stadium"]
                    db.add(existing_game)  # 업데이트 사항 반영
            else:
                # 존재하지 않으면 새로운 경기 추가
                db_game = Game(
                    date=game["date"],
                    time=game["time"],
                    away_team_id=game["away_team_id"],
                    home_team_id=game["home_team_id"],
                    away_score=game["away_score"],
                    home_score=game["home_score"],
                    game_result=game["game_result"],
                    stadium=game["stadium"],
                    season=game["season"]
                )
                db.add(db_game)  # 데이터 추가
                
            # Redis에 캐시: 유효기간 4시간 설정
            redis_client.set(redis_key, json.dumps(game), ex=14400)
                
        db.commit()  # 변경 사항 저장
    except Exception as e:
        print(f"데이터 저장 중 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()  # DB 세션 닫기

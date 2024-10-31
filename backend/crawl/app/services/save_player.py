from sqlalchemy.orm import Session
from app.models import Team, Player, SessionLocal


def save_player_to_db(player_list):
    if not player_list:
        print("저장할 선수 데이터가 없습니다.")
        return

    db: Session = SessionLocal()
    try:
        for player in player_list:
            team_obj = db.query(Team).filter_by(team_name=player['team']).first()
            
            if team_obj is None:
                print(f"선수 정보를 찾을 수 없습니다: {player['team']}")
                continue
            
            player["team_id"] = team_obj.id
            
            existing_player = db.query(Player).filter_by(
                back_number=player["back_number"],
                position=player["position"],
                birth=player["birth"],
            ).first()

            if not existing_player:
                # 존재하지 않으면 새로운 선수 추가
                db_player = Player(
                    back_number = player["back_number"],
                    name = player["name"],
                    team_id = player["team_id"],
                    position = player["position"],
                    birth = player["birth"],
                    physical = player["physical"],
                    academic = player["academic"],
                )
                db.add(db_player)  # 데이터 추가
                
        db.commit()  # 변경 사항 저장
    except Exception as e:
        print(f"데이터 저장 중 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()  # DB 세션 닫기

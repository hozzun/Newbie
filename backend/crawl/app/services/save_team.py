from sqlalchemy.orm import Session
from app.models import Team, SessionLocal


def save_team_to_db(team_list):
    if not team_list:
        print("저장할 팀 데이터가 없습니다.")
        return

    db: Session = SessionLocal()
    try:
        for team in team_list:
            existing_team = db.query(Team).filter_by(
                team_name=team["team_name"],
            ).first()

            if not existing_team:
                db_team = Team(
                    team_name=team["team_name"],
                    team_logo=team["team_logo"],
                )
                db.add(db_team)
                
        db.commit()
    except Exception as e:
        print(f"데이터 저장 중 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()
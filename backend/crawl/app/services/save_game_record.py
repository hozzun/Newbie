from sqlalchemy.orm import Session
from app.models import SessionLocal, GameRecord, Game, Team

def save_game_record_to_db(game_record_list):
    if not game_record_list:
        print("저장할 경기 기록 데이터가 없습니다.")
        return

    db: Session = SessionLocal()
    try:
        for record in game_record_list:
            # 게임 정보 가져오기
            game_date = record['game_date']
            stadium = record['stadium'].strip()
            away_team_name = record['away_team_name'].strip()
            home_team_name = record['home_team_name'].strip()

            # 팀 정보 가져오기
            away_team = db.query(Team).filter_by(team_name=away_team_name).first()
            home_team = db.query(Team).filter_by(team_name=home_team_name).first()

            if not away_team or not home_team:
                print(f"팀 정보를 찾을 수 없습니다: {away_team_name}, {home_team_name}")
                continue

            # 게임 정보 가져오기
            game = db.query(Game).filter_by(
                date=game_date,
                # stadium=stadium,
                away_team_id=away_team.id,
                home_team_id=home_team.id
            ).first()

            if not game:
                print(f"게임 정보를 찾을 수 없습니다: {game_date}, {stadium}")
                continue

            # 기존 GameRecord가 있는지 확인
            existing_record = db.query(GameRecord).filter_by(game_id=game.id).first()
            if existing_record:
                print(f"이미 존재하는 게임 기록: 게임 ID={game.id}")
                continue

            # 새로운 GameRecord 생성
            game_record = GameRecord(
                game_id=game.id,
                stadium=record['stadium'],
                crowd=record['crowd'],
                start_time=record['start_time'],
                end_time=record['end_time'],
                run_time=record['run_time'],
                away_score=record['away_score'],
                home_score=record['home_score'],
                # away_starting_pitcher=record.get('away_starting_pitcher'),
                away_starting_pitcher=record['away_starting_pitcher'],
                # home_starting_pitcher=record.get('home_starting_pitcher'),
                home_starting_pitcher=record['home_starting_pitcher'],
                winning_hit=record['winning_hit'],
                home_runs=record['home_runs'],
                doubles=record['doubles'],
                errors=record['errors'],
                stolen_bases=record['stolen_bases'],
                caught_stealing=record['caught_stealing'],
                double_plays=record['double_plays'],
                wild_pitches=record['wild_pitches'],
                umpires=record['umpires']
            )

            db.add(game_record)

        db.commit()

    except Exception as e:
        print(f"데이터 저장 중 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

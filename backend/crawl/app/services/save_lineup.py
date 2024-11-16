from sqlalchemy.orm import Session
from app.models import SessionLocal, Lineup, Game, Team, Player

def save_lineup_to_db(lineup_list):
    if not lineup_list:
        print("저장할 선발 라인업 데이터가 없습니다.")
        return

    db: Session = SessionLocal()
    try:
        for lineup in lineup_list:
            # 게임 정보 가져오기
            game_date = lineup['game_date']
            stadium = lineup['stadium']
            away_team_name = lineup['away_team_name'].strip()
            home_team_name = lineup['home_team_name'].strip()

            print(f"게임 처리 중: 날짜={game_date}, 경기장={stadium}, 원정팀={away_team_name}, 홈팀={home_team_name}")

            # 날짜와 팀 이름으로 게임 객체 찾기
            away_team = db.query(Team).filter_by(team_name=away_team_name).first()
            home_team = db.query(Team).filter_by(team_name=home_team_name).first()
            
            

            if not away_team or not home_team:
                print(f"팀 정보를 찾을 수 없습니다: {away_team_name}, {home_team_name}")
                continue

            game = db.query(Game).filter_by(
                date=game_date,
                stadium=stadium,
                away_team_id=away_team.id,
                home_team_id=home_team.id
            ).first()

            if not game:
                print(f"게임 정보를 찾을 수 없습니다: {game_date}, {stadium}")
                continue

            # 원정팀과 홈팀 라인업을 저장
            for team_id, team_lineup in [(away_team.id, lineup['away_team']), (home_team.id, lineup['home_team'])]:
                for player_info in team_lineup:
                    batting_order = int(player_info['batting_order'])
                    position = player_info['position']
                    player_name = player_info['player'].strip()

                    # print(f"선수 처리 중: 이름={player_name}, 타순={batting_order}, 포지션={position}")

                    # 선수 이름으로 선수 객체 찾기
                    player = db.query(Player).filter_by(name=player_name, team_id=team_id).first()
                    if not player:
                        print(f"선수 정보를 찾을 수 없습니다: {player_name}")
                        continue

                    # 기존 라인업 엔트리가 있는지 확인
                    existing_entry = db.query(Lineup).filter_by(
                        game_id=game.id,
                        team_id=team_id,
                        player_id=player.id
                    ).first()

                    if not existing_entry:
                        # 새로운 라인업 엔트리 생성
                        lineup_entry = Lineup(
                            game_id=game.id,
                            team_id=team_id,
                            player_id=player.id,
                            batting_order=batting_order,
                            position=position,
                            war=war
                        )
                        db.add(lineup_entry)
                        # print(f"라인업 엔트리 추가: 게임 ID={game.id}, 팀 ID={team_id}, 선수 ID={player.id}, 타순={batting_order}")
                    else:
                        print(f"이미 존재하는 라인업 엔트리: 게임 ID={game.id}, 팀 ID={team_id}, 선수 ID={player.id}")
    
        db.commit()
        print("라인업 데이터 저장 완료")
    except Exception as e:
        print(f"데이터 저장 중 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()


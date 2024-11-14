from sqlalchemy.orm import Session
from app.models import Team, Player, PitcherStats, SessionLocal


def save_pitcher_stats_to_db(pitcher_stats_list):
    if not pitcher_stats_list:
        print("저장할 투수 선수 기록 데이터가 없습니다.")
        return

    db: Session = SessionLocal()
    try:
        for stats in pitcher_stats_list:
            if stats["team_name"] == "SK":
                stats["team_name"] = "SSG"
            
            team_obj = db.query(Team).filter_by(team_name=stats["team_name"]).first()
            player_obj = db.query(Player).filter_by(name=stats["player_name"]).first()
            
            if team_obj is None:
                print(f"팀 정보를 찾을 수 없습니다: {stats['team_name']}")
                continue
            
            if player_obj is None:
                print(f"선수 정보를 찾을 수 없습니다: {stats['player_name']}")
                continue
            
            stats["team_id"] = team_obj.id
            stats["player_id"] = player_obj.id
            
            stats["game_count"] = int(stats["game_count"])
            stats["win"] = int(stats["win"])
            stats["lose"] = int(stats["lose"])
            stats["save"] = int(stats["save"])
            stats["hld"] = int(stats["hld"])
            stats["h"] = int(stats["h"])
            stats["hr"] = int(stats["hr"])
            stats["bb"] = int(stats["bb"])
            stats["hbp"] = int(stats["hbp"])
            stats["so"] = int(stats["so"])
            stats["r"] = int(stats["r"])
            stats["er"] = int(stats["er"])
            
            existing_record = db.query(PitcherStats).filter_by(
                year=stats["year"],
                player_id=stats["player_id"]
            ).first()

            if existing_record:
                # 기존 기록이 있으면 업데이트
                existing_record.era = stats["era"]
                existing_record.game_count = stats["game_count"]
                existing_record.win = stats["win"]
                existing_record.lose = stats["lose"]
                existing_record.save = stats["save"]
                existing_record.hld = stats["hld"]
                existing_record.wpct = stats["wpct"]
                existing_record.ip = stats["ip"]
                existing_record.h = stats["h"]
                existing_record.hr = stats["hr"]
                existing_record.bb = stats["bb"]
                existing_record.hbp = stats["hbp"]
                existing_record.so = stats["so"]
                existing_record.r = stats["r"]
                existing_record.er = stats["er"]
                existing_record.whip = stats["whip"]
            else:
                # 존재하지 않으면 새로운 기록 추가
                db_pitcher_stats = PitcherStats(
                    year=stats["year"],
                    player_id=stats["player_id"],
                    team_id=stats["team_id"],
                    era = stats["era"],
                    game_count = stats["game_count"],
                    win = stats["win"],
                    lose = stats["lose"],
                    save = stats["save"],
                    hld = stats["hld"],
                    wpct = stats["wpct"],
                    ip = stats["ip"],
                    h = stats["h"],
                    hr = stats["hr"],
                    bb = stats["bb"],
                    hbp = stats["hbp"],
                    so = stats["so"],
                    r = stats["r"],
                    er = stats["er"],
                    whip = stats["whip"],
                )
                db.add(db_pitcher_stats)  # 새 기록 추가

        db.commit()  # 변경 사항 저장
        print("투수 선수 기록 데이터가 성공적으로 저장되었습니다.")
        
    except Exception as e:
        print(f"데이터베이스 저장 중 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()  # 에러 발생 시 롤백
    finally:
        db.close()  # DB 세션 닫기

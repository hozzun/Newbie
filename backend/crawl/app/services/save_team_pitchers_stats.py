from sqlalchemy.orm import Session
from app.models import Team, TeamPitcherStats, SessionLocal


def save_team_pitcher_stats_to_db(team_pitcher_stats_list):
    if not team_pitcher_stats_list:
        print("저장할 팀 투수 기록 데이터가 없습니다.")
        return

    db: Session = SessionLocal()
    try:
        for stats in team_pitcher_stats_list:
            # 팀 이름을 통해 팀 ID 가져오기
            team_obj = db.query(Team).filter_by(team_name=stats["team_name"]).first()
            
            if team_obj is None:
                print(f"팀 정보를 찾을 수 없습니다: {stats['team_name']}")
                continue
            
            stats["team_id"] = team_obj.id
            
            stats["rank"] = int(stats["rank"])
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
            
            # 중복 기록 체크 (같은 연도와 팀 ID가 있는지 확인)
            existing_record = db.query(TeamPitcherStats).filter_by(
                year=stats["year"],
                team_id=stats["team_id"]
            ).first()

            if existing_record:
                # 기존 기록이 있으면 업데이트
                existing_record.rank = stats["rank"]
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
                db_team_pitcher_stats = TeamPitcherStats(
                    year=stats["year"],
                    rank=stats["rank"],
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
                db.add(db_team_pitcher_stats)  # 새 기록 추가

        db.commit()  # 변경 사항 저장
        print("팀 투수 기록 데이터가 성공적으로 저장되었습니다.")
        
    except Exception as e:
        print(f"데이터베이스 저장 중 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()  # 에러 발생 시 롤백
    finally:
        db.close()  # DB 세션 닫기

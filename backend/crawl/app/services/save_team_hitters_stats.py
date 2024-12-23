from sqlalchemy.orm import Session
from app.models import Team, TeamHitterStats, SessionLocal


def save_team_hitter_stats_to_db(team_hitter_stats_list):
    if not team_hitter_stats_list:
        print("저장할 팀 타자 기록 데이터가 없습니다.")
        return

    db: Session = SessionLocal()
    try:
        for stats in team_hitter_stats_list:
            if stats["team_name"] == "SK":
                stats["team_name"] = "SSG"
                
            # 팀 이름을 통해 팀 ID 가져오기
            team_obj = db.query(Team).filter_by(team_name=stats["team_name"]).first()
            
            if team_obj is None:
                print(f"팀 정보를 찾을 수 없습니다: {stats['team_name']}")
                continue
            
            stats["team_id"] = team_obj.id
            
            stats["rank"] = int(stats["rank"])
            stats["game_count"] = int(stats["game_count"])
            stats["pa"] = int(stats["pa"])
            stats["ab"] = int(stats["ab"])
            stats["r"] = int(stats["r"])
            stats["h"] = int(stats["h"])
            stats["two"] = int(stats["two"])
            stats["three"] = int(stats["three"])
            stats["homerun"] = int(stats["homerun"])
            stats["tb"] = int(stats["tb"])
            stats["rbi"] = int(stats["rbi"])
            stats["sac"] = int(stats["sac"])
            stats["sf"] = int(stats["sf"])
            
            # 중복 기록 체크 (같은 연도와 팀 ID가 있는지 확인)
            existing_record = db.query(TeamHitterStats).filter_by(
                year=stats["year"],
                team_id=stats["team_id"]
            ).first()

            if existing_record:
                # 기존 기록이 있으면 업데이트
                existing_record.rank = stats["rank"]
                existing_record.avg = stats["avg"]
                existing_record.game_count = stats["game_count"]
                existing_record.pa = stats["pa"]
                existing_record.ab = stats["ab"]
                existing_record.r = stats["r"]
                existing_record.h = stats["h"]
                existing_record.two = stats["two"]
                existing_record.three = stats["three"]
                existing_record.homerun = stats["homerun"]
                existing_record.tb = stats["tb"]
                existing_record.rbi = stats["rbi"]
                existing_record.sac = stats["sac"]
                existing_record.sf = stats["sf"]
            else:
                # 존재하지 않으면 새로운 기록 추가
                db_team_hitter_stats = TeamHitterStats(
                    year=stats["year"],
                    rank=stats["rank"],
                    team_id=stats["team_id"],
                    avg=stats["avg"],
                    game_count=stats["game_count"],
                    pa=stats["pa"],
                    ab=stats["ab"],
                    r=stats["r"],
                    h=stats["h"],
                    two=stats["two"],
                    three=stats["three"],
                    homerun=stats["homerun"],
                    tb=stats["tb"],
                    rbi=stats["rbi"],
                    sac=stats["sac"],
                    sf=stats["sf"]
                )
                db.add(db_team_hitter_stats)  # 새 기록 추가

        db.commit()  # 변경 사항 저장
        print("팀 타자 기록 데이터가 성공적으로 저장되었습니다.")
        
    except Exception as e:
        print(f"데이터베이스 저장 중 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()  # 에러 발생 시 롤백
    finally:
        db.close()  # DB 세션 닫기

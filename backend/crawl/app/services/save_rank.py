from sqlalchemy.orm import Session
from app.models import Team, Rank, SessionLocal

def save_rank_to_db(rank_list):
    if not rank_list:
        print("저장할 팀 순위 데이터가 없습니다.")
        return

    db: Session = SessionLocal()
    try:
        for rank in rank_list:
            if rank['team'] == "SK":
                rank['team'] = "SSG"
                
            team_obj = db.query(Team).filter_by(team_name=rank['team']).first()
            if team_obj is None:
                print(f"팀 정보를 찾을 수 없습니다: {rank['team']}")
                continue

            rank["team_id"] = team_obj.id
            rank["rank"] = int(rank["rank"]) 
            rank["game_count"] = int(rank["game_count"])
            rank["win_count"] = int(rank["win_count"])
            rank["lose_count"] = int(rank["lose_count"])
            rank["draw_count"] = int(rank["draw_count"])

            # 직전 순위 조회
            previous_rank_entry = db.query(Rank).filter(
                Rank.team_id == rank["team_id"],
                Rank.year == rank["year"]
            ).order_by(Rank.id.desc()).first()  # 직전 기록을 가져옴

            # 순위 변동 계산
            if previous_rank_entry:
                previous_rank = int(previous_rank_entry.rank)
                current_rank = int(rank["rank"])
                
                rank_change = 1 if current_rank < previous_rank else -1 if current_rank > previous_rank else 0
                rank_change_amount = abs(previous_rank - current_rank) if rank_change != 0 else 0
            else:
                rank_change = 0  # 직전 데이터가 없으면 변동 없음
                rank_change_amount = 0  # 변동량이 없는 경우 0

            # 기존 랭킹 데이터를 업데이트 또는 새로운 랭킹 데이터 추가
            existing_rank = db.query(Rank).filter_by(
                team_id=rank["team_id"],
                year=rank["year"]
            ).first()

            if existing_rank:
                if (existing_rank.rank != rank["rank"] or
                    existing_rank.game_count != rank["game_count"] or
                    existing_rank.win_count != rank["win_count"] or
                    existing_rank.lose_count != rank["lose_count"] or
                    existing_rank.draw_count != rank["draw_count"]):
                    # 업데이트
                    existing_rank.rank = rank["rank"]
                    existing_rank.game_count = rank["game_count"]
                    existing_rank.win_count = rank["win_count"]
                    existing_rank.lose_count = rank["lose_count"]
                    existing_rank.draw_count = rank["draw_count"]
                    existing_rank.win_rate = rank["win_rate"]
                    existing_rank.game_diff = rank["game_diff"]
                    existing_rank.recent_10 = rank["recent_10"]
                    existing_rank.streak = rank["streak"]
                    existing_rank.rank_change = rank_change
                    existing_rank.rank_change_amount = rank_change_amount
                    
            else:
                # 새로운 랭킹 데이터 추가
                db_rank = Rank(
                    year=rank["year"],
                    rank=rank["rank"],
                    team_id=rank["team_id"],
                    game_count=rank["game_count"],
                    win_count=rank["win_count"],
                    lose_count=rank["lose_count"],
                    draw_count=rank["draw_count"],
                    win_rate=rank["win_rate"],
                    game_diff=rank["game_diff"],
                    recent_10=rank["recent_10"],
                    streak=rank["streak"],
                    rank_change=rank_change,
                    rank_change_amount=rank_change_amount
                )
                db.add(db_rank)

        db.commit()
    except Exception as e:
        print(f"데이터 저장 중 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

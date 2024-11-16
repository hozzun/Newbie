from sqlalchemy.orm import Session
from app.models import Team, Player, SessionLocal

team_name_map = {
    "HT": "KIA",
    "SS": "삼성",
    "LG": "LG",
    "OB": "두산",
    "KT": "KT",
    "SK": "SSG",
    "LT": "롯데",
    "HH": "한화",
    "NC": "NC",
    "WO": "키움"
}

default_image_url = "https://image.tving.com/ntgs/sports/kbo/player/20240304/default.png/dims/resize/F_webp,400"

def update_player_images(image_list):
    if not image_list:
        print("업데이트할 이미지 데이터가 없습니다.")
        return

    db: Session = SessionLocal()
    success_count = 0
    fail_count = 0
    try:
        for image_data in image_list:
            # 팀 코드 변환
            team_name = team_name_map.get(image_data["team_name"], image_data["team_name"])
            
            # 팀 이름으로 팀 ID 찾기
            team_obj = db.query(Team).filter_by(team_name=team_name).first()
            
            if not team_obj:
                print(f"[오류] 팀 정보를 찾을 수 없습니다: {image_data['team_name']} (변환된 이름: {team_name})")
                fail_count += 1
                continue

            # 선수 이름과 팀 ID로 player 레코드 찾기
            player = db.query(Player).filter_by(name=image_data["player_name"], team_id=team_obj.id).first()
            
            if not player:
                print(f"[오류] 선수 정보를 찾을 수 없습니다: {image_data['player_name']} (팀: {team_name})")
                fail_count += 1
                continue

            # image_url 업데이트
            new_image_url = image_data.get("image_url", default_image_url)
            if not player.image_url or player.image_url == default_image_url:
                player.image_url = new_image_url
                success_count += 1
                print(f"[업데이트 성공] {player.name} (팀: {team_name}) -> {new_image_url}")
            else:
                print(f"[이미 존재] {player.name} (팀: {team_name}) -> {player.image_url}")

        # 변경 사항 커밋
        db.commit()
        print(f"\n[결과] 성공: {success_count}건, 실패: {fail_count}건")
        print("모든 이미지 데이터가 성공적으로 업데이트되었습니다.")
        
    except Exception as e:
        print(f"[오류] 데이터베이스 업데이트 중 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()  # 에러 발생 시 롤백
    finally:
        db.close()  # DB 세션 닫기

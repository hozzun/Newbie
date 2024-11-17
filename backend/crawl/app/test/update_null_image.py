from sqlalchemy.orm import Session
from app.models import Team, Player, SessionLocal

def set_default_images_for_missing_players():
    """
    DB에서 image_url이 NULL 또는 빈 문자열인 선수들에게 디폴트 이미지를 설정
    """
    db: Session = SessionLocal()
    default_image_url = "https://image.tving.com/ntgs/sports/kbo/player/20240304/default.png/dims/resize/F_webp,400"

    try:
        # image_url이 NULL 또는 빈 문자열인 선수 검색
        players_without_images = db.query(Player).filter(
            (Player.image_url == None) | (Player.image_url == "")
        ).all()

        if not players_without_images:
            print("디폴트 이미지가 필요한 선수가 없습니다.")
            return

        for player in players_without_images:
            player.image_url = default_image_url
            print(f"[디폴트 이미지 설정] {player.name} -> {default_image_url}")

        # 변경 사항 커밋
        db.commit()
        print(f"\n총 {len(players_without_images)}명의 선수에게 디폴트 이미지를 설정했습니다.")

    except Exception as e:
        print(f"[오류] 디폴트 이미지 설정 중 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()  # 에러 발생 시 롤백
    finally:
        db.close()  # DB 세션 닫기
        

set_default_images_for_missing_players()
from app.crawls.crawl_player import crawl_player
from app.services.save_player import save_player_to_db

def save_player():
    # 경기 데이터를 크롤링합니다.
    player_list = crawl_player()
    save_player_to_db(player_list)

# 수동으로 update_game 함수를 실행하여 크롤링한 데이터를 DB에 저장
print("선수 데이터를 크롤링하고 DB에 저장 중입니다...")
save_player()
print("데이터 저장이 완료되었습니다.")
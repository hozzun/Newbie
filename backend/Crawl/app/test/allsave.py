from app.crawls.crawl_all_game import crawl_all_game
from app.services.save_game import save_game_to_db

def update_game():
    # 경기 데이터를 크롤링합니다.
    game_list = crawl_all_game()
    save_game_to_db(game_list)

# 수동으로 update_game 함수를 실행하여 크롤링한 데이터를 DB에 저장
print("전체 경기 데이터를 크롤링하고 DB에 저장 중입니다...")
update_game()
print("전체 데이터 저장이 완료되었습니다.")
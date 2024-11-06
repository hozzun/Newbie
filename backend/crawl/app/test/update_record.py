from app.crawls.crawl_lineup import crawl_lineup
from app.services.save_lineup import save_lineup_to_db
from app.crawls.crawl_rank import crawl_rank
from app.services.save_rank import save_rank_to_db
from app.crawls.crawl_game_record import crawl_game_record
from app.services.save_game_record import save_game_record_to_db

def update_record():
    # 경기 데이터를 크롤링합니다.
    record_list = crawl_game_record()
    save_game_record_to_db(record_list)

# 수동으로 update_game 함수를 실행하여 크롤링한 데이터를 DB에 저장
print("레코드 데이터를 크롤링하고 DB에 저장 중입니다...")
update_record()
print("데이터 저장이 완료되었습니다.")
from app.crawls.crawl_lineup import crawl_lineup
from app.services.save_lineup import save_lineup_to_db

def update_rank():
    # 경기 데이터를 크롤링합니다.
    rank_list = crawl_lineup()
    save_lineup_to_db(rank_list)

# 수동으로 update_game 함수를 실행하여 크롤링한 데이터를 DB에 저장
print("팀 순위 데이터를 크롤링하고 DB에 저장 중입니다...")
update_rank()
print("데이터 저장이 완료되었습니다.")
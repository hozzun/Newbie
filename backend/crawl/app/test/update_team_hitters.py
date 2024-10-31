from app.crawls.crawl_team_hitter_stats import crawl_team_hitter_stats
from app.services.save_team_hitters_stats import save_team_hitter_stats_to_db
from app.crawls.crawl_hitter_stats import crawl_hitter_stats
from app.services.save_hitters_stats import save_hitter_stats_to_db

def update_team_hitters():
    # 경기 데이터를 크롤링합니다.
    hitters_list = crawl_team_hitter_stats()
    save_team_hitter_stats_to_db(hitters_list)
    
def update_hitters():
    hitters_list = crawl_hitter_stats()
    save_hitter_stats_to_db(hitters_list)

# 수동으로 update_game 함수를 실행하여 크롤링한 데이터를 DB에 저장
print("타자 기록 데이터를 크롤링하고 DB에 저장 중입니다...")
update_team_hitters()
update_hitters()
print("데이터 저장이 완료되었습니다.")
from app.crawls.crawl_team_hitter_stats import crawl_team_hitter_stats
from app.services.save_team_hitters_stats import save_team_hitter_stats_to_db
from app.crawls.crawl_hitter_stats import crawl_hitter_stats
from app.services.save_hitters_stats import save_hitter_stats_to_db
from app.crawls.crawl_team_pitcher_stats import crawl_team_pitcher_stats
from app.services.save_team_pitchers_stats import save_team_pitcher_stats_to_db
from app.crawls.crawl_pitcher_stats import crawl_pitcher_stats
from app.services.save_pitchers_stats import save_pitcher_stats_to_db

def update_team_hitters():
    # 경기 데이터를 크롤링합니다.
    hitters_list = crawl_team_hitter_stats()
    save_team_hitter_stats_to_db(hitters_list)
    
def update_hitters():
    hitters_list = crawl_hitter_stats()
    save_hitter_stats_to_db(hitters_list)
    
def update_team_pitchers():
    # 경기 데이터를 크롤링합니다.
    pitchers_list = crawl_team_pitcher_stats()
    save_team_pitcher_stats_to_db(pitchers_list)

def update_pitchers():
    pitchers_list = crawl_pitcher_stats()
    save_pitcher_stats_to_db(pitchers_list)

print("데이터를 크롤링하고 DB에 저장 중입니다...")
# update_team_hitters()
update_hitters()
update_team_pitchers()
update_pitchers()
print("데이터 저장이 완료되었습니다.")
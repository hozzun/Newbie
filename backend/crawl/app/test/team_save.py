from app.crawls.crawl_all_game import crawl_all_game
from app.services.save_game import save_game_to_db
from app.crawls.crawl_team import crawl_team
from app.services.save_team import save_team_to_db

def update_team():
    # 경기 데이터를 크롤링합니다.
    team_list = crawl_team()
    save_team_to_db(team_list)

# 수동으로 update_game 함수를 실행하여 크롤링한 데이터를 DB에 저장
print("팀 데이터를 크롤링하고 DB에 저장 중입니다...")
update_team()
print("팀 데이터 저장이 완료되었습니다.")
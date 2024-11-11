from apscheduler.schedulers.background import BackgroundScheduler
from app.models import SessionLocal, Game, Player, Rank, Team, Lineup, TeamHitterStats, TeamPitcherStats, HitterStats, PitcherStats, GameRecord

from app.crawls.crawl_game import crawl_game
from app.crawls.crawl_all_game import crawl_all_game
from app.crawls.crawl_player import crawl_player
from app.crawls.crawl_rank import crawl_rank
from app.crawls.crawl_team import crawl_team
from app.crawls.crawl_lineup import crawl_lineup
from app.crawls.crawl_team_hitter_stats import crawl_team_hitter_stats
from app.crawls.crawl_team_pitcher_stats import crawl_team_pitcher_stats
from app.crawls.crawl_hitter_stats import crawl_hitter_stats
from app.crawls.crawl_pitcher_stats import crawl_pitcher_stats
from app.crawls.crawl_game_record import crawl_game_record

from app.services.save_game import save_game_to_db
from app.services.save_player import save_player_to_db
from app.services.save_rank import save_rank_to_db
from app.services.save_team import save_team_to_db
from app.services.save_lineup import save_lineup_to_db
from app.services.save_team_hitters_stats import save_team_hitter_stats_to_db
from app.services.save_team_pitchers_stats import save_team_pitcher_stats_to_db
from app.services.save_hitters_stats import save_hitter_stats_to_db
from app.services.save_pitchers_stats import save_pitcher_stats_to_db
from app.services.save_game_record import save_game_record_to_db

# 스케줄러 인스턴스 생성
scheduler = BackgroundScheduler()
scheduler.configure(job_defaults={'max_instances': 1})  # 동시에 1개의 인스턴스만 실행

def is_db_empty():
    db = SessionLocal()
    try:
        team_count = db.query(Team).count()
        game_count = db.query(Game).count()
        player_count = db.query(Player).count()
        rank_count = db.query(Rank).count()
        team_hitters_stats_count = db.query(TeamHitterStats).count()
        team_pitchers_stats_count = db.query(TeamPitcherStats).count()
        hitters_stats_count = db.query(HitterStats).count()
        pitchers_stats_count = db.query(PitcherStats).count()
        game_record_count = db.query(GameRecord).count()
        return team_count == 0 or game_count == 0 or player_count == 0 or rank_count == 0 or team_hitters_stats_count == 0 or team_pitchers_stats_count == 0 or hitters_stats_count == 0 or pitchers_stats_count == 0 or game_record_count == 0
    finally:
        db.close()


# 크롤링 데이터 스케줄링 함수
def save_team():
    print("팀 데이터 저장")
    team_list = crawl_team()
    save_team_to_db(team_list)
    print("팀 데이터 저장 완료")
    
def save_all_game():
    print("전체 게임 데이터 저장 시작")
    game_list = crawl_all_game()
    save_game_to_db(game_list)
    print("전체 게임 데이터 저장 완료")
    
def update_game():
    print("게임(월) 데이터 업데이트 및 저장 시작")
    game_list = crawl_game
    save_game_to_db(game_list)
    print("게임(월) 데이터 업데이트 및 저장 완료")
    
def update_player():
    print("선수 데이터 업데이트 및 저장 시작")
    player_list = crawl_player()
    save_player_to_db(player_list)
    print("선수 데이터 업데이트 및 저장 완료")

def update_rank():
    print("순위 데이터 업데이트 및 저장 시작")
    rank_list = crawl_rank()
    save_rank_to_db(rank_list)
    print("순위 데이터 업데이트 및 저장 완료")
    
def update_lineup():
    print("선발 라인업 업데이트 및 저장 시작")
    lineup_list = crawl_lineup()
    save_lineup_to_db(lineup_list)
    print("선발 라인업 업데이트 및 저장 완료")
    
def update_team_hitters_stats():
    print("팀 타자 기록 업데이트 및 저장 시작")
    hitters_stats = crawl_team_hitter_stats()
    save_team_hitter_stats_to_db(hitters_stats)
    print("팀 타자 기록 업데이트 및 저장 완료")
    
def update_team_pitchers_stats():
    print("팀 투수 기록 업데이트 및 저장 시작")
    pitchers_stats = crawl_team_pitcher_stats()
    save_team_pitcher_stats_to_db(pitchers_stats)
    print("팀 투수 기록 업데이트 및 저장 완료")
    
def update_hitters_stats():
    print("타자 시즌 기록 업데이트 및 저장 시작")
    hitters_stats = crawl_hitter_stats()
    save_hitter_stats_to_db(hitters_stats)
    print("타자 시즌 기록 업데이트 및 저장 완료")
    
def update_pitchers_stats():
    print("투수 시즌 기록 업데이트 및 저장 시작")
    pitchers_stats = crawl_pitcher_stats()
    save_pitcher_stats_to_db(pitchers_stats)
    print("투수 시즌 기록 업데이트 및 저장 완료")
    
def update_game_record():
    print("게임 경기결과(리뷰) 업데이트 및 저장 시작")
    game_record = crawl_game_record()
    save_game_record_to_db(game_record)
    print("게임 경기결과(리뷰) 업데이트 및 저장 완료")

def initialize_data():
    print("DB가 비어 있습니다. 데이터를 저장합니다.")
    save_team()
    save_all_game()
    update_player()
    update_rank()
    update_team_hitters_stats()
    update_team_pitchers_stats()
    update_hitters_stats()
    update_pitchers_stats()
    update_game_record()
    print("모든 데이터 저장 완료")


# 스케줄러 시작 함수
def start_scheduler():
    # DB 비어있으면 DB 저장
    if is_db_empty():
        initialize_data()
        
    # 오후 2시부터 11시까지 5분마다 게임과 게임 기록 업데이트
    scheduler.add_job(update_game, 'cron', hour='14-23', minute='*/5')
    scheduler.add_job(update_game_record, 'cron', hour='14-23', minute='*/5')
    
    # 스케줄링 작업 목록
    scheduler.add_job(update_game, 'cron', hour=2, minute=0)
    scheduler.add_job(update_player, 'cron', hour=2, minute=0)
    scheduler.add_job(update_rank, 'cron', hour=2, minute=0)
    scheduler.add_job(update_lineup, 'cron', hour=2, minute=0)
    scheduler.add_job(update_team_hitters_stats, 'cron', hour=2, minute=0)
    scheduler.add_job(update_team_pitchers_stats, 'cron', hour=2, minute=0)
    scheduler.add_job(update_hitters_stats, 'cron', hour=2, minute=0)
    scheduler.add_job(update_pitchers_stats, 'cron', hour=2, minute=0)
    scheduler.add_job(update_game_record, 'cron', hour=2, minute=0)
    scheduler.start()

# 스케줄러 종료 함수
def shutdown_scheduler():
    scheduler.shutdown()

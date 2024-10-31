from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.game import router as game_router
from app.routers.player import router as player_router
from app.routers.rank import router as rank_router
from app.routers.team import router as team_router
from app.models.database import create_tables
from app.services.scheduler import start_scheduler, shutdown_scheduler
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 애플리케이션 시작 시 스케줄러 시작
    start_scheduler()
    print("스케줄러 실행")
    yield
    # 애플리케이션 종료 시 스케줄러 종료
    shutdown_scheduler()
    print("스케줄러 종료")

app = FastAPI(
    title="Newbie Crawl API",
    description="Newbie 크롤링 API",
    version="1.0.0",
    lifespan=lifespan
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 테이블 생성
create_tables()

# 라우터 추가
app.include_router(game_router, prefix="/api/v1", tags=["경기일정 및 결과 조회"])
app.include_router(player_router, prefix="/api/v1", tags=["선수 조회"])
app.include_router(rank_router, prefix="/api/v1", tags=["팀 순위 조회"])
app.include_router(team_router, prefix="/api/v1", tags=["팀 이름 & 로고 조회"])

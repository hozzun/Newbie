from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import os
from dotenv import load_dotenv

load_dotenv()

ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN")

def add_cors_middleware(app: FastAPI):

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[ALLOWED_ORIGIN],  # 허용할 출처
        allow_credentials=True,
        allow_methods=["*"],  # 허용할 HTTP 메서드
        allow_headers=["*"],  # 허용할 헤더
    )

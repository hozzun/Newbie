from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from recommend import recommend_team
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 미들웨어 추가
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 허용할 출처
    allow_credentials=True,
    allow_methods=["*"],  # 허용할 HTTP 메서드
    allow_headers=["*"],  # 허용할 헤더
)


class UserData(BaseModel):
    mbti: str
    responses: list[int]
    region: str = None

@app.post("/recommend/")
async def get_recommendation(request: UserData):
    try:
        recommended_team = recommend_team(request.mbti, request.responses, request.region)
        return {"recommended_team": recommended_team}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
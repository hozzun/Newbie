from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from recommend import recommend_team
from middleware import add_cors_middleware

app = FastAPI()

# CORS 미들웨어 설정 적용
add_cors_middleware(app)

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

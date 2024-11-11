from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.recommend import recommend_team
from app.middleware import add_cors_middleware

app = FastAPI()

add_cors_middleware(app)

class UserData(BaseModel):
    userId: int
    mbti: str
    responses: list[int]
    region: str = None

@app.post("/recommend")
async def get_recommendation(request: UserData):
    try:
        recommended_team = recommend_team(request.mbti, request.responses, request.region)
        return {"recommendTeam": recommended_team}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

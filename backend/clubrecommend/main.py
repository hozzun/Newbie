from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
from recommend import recommend_team
from PIL import Image
import numpy as np
import cv2
import easyocr

app = FastAPI()

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

reader = easyocr.Reader(['ko', 'en'])  # 한국어와 영어 지원

@app.post("/text/")
async def get_text(file: UploadFile = File(...)):
    # 파일을 읽어와 numpy array로 변환
    image = Image.open(file.file)
    image_array = np.array(image)
    gray = cv2.GaussianBlur(image_array, (5, 5), 0)
    
    # OCR 텍스트 추출
    result = reader.readtext(gray)
    
    # 추출된 텍스트를 리스트로 반환
    extracted_text = [text[1] for text in result]
    
    return {"extracted_text": extracted_text}
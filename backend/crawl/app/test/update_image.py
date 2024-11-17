from app.crawls.crawl_image import crawl_image
from app.services.save_image import update_player_images

def update_image():
    # 경기 데이터를 크롤링합니다.
    image_list = crawl_image()
    update_player_images(image_list)

# 수동으로 update_game 함수를 실행하여 크롤링한 데이터를 DB에 저장
print("이미지 데이터를 크롤링하고 DB에 저장 중입니다...")
update_image()
print("데이터 저장이 완료되었습니다.")
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


def crawl_image():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-popup-blocking")
    chrome_options.add_argument("--lang=ko")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--window-size=1920x1080")

    driver_path = "C:/chromedriver/chromedriver.exe"
    service = Service(executable_path=driver_path)

    driver = None
    image_list = []
    team_list = ["HT", "SS", "LG", "OB", "KT", "SK", "LT", "HH", "NC", "WO"]
    position_list = ["pitcher", "infielder", "outfielder", "catcher"]
    default_image_url = "https://image.tving.com/ntgs/sports/kbo/player/20240304/default.png/dims/resize/F_webp,400"

    try:
        driver = webdriver.Chrome(service=service, options=chrome_options)
        wait = WebDriverWait(driver, 10)

        for team in team_list:
            for position in position_list:
                try:
                    driver.get(f"https://www.tving.com/kbo/roaster/{team}?position={position}")
                    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "ul.grid li")))

                    players = driver.find_elements(By.CSS_SELECTOR, "ul.grid li")
                    for player in players:
                        try:
                            name = player.find_element(By.CSS_SELECTOR, "p.atom-text-wrapper").text.strip()
                            img_element = player.find_element(By.CSS_SELECTOR, "img")
                            datasrc = img_element.get_attribute("datasrc")
                            src = img_element.get_attribute("src")

                            img_url = datasrc or src
                            if not img_url or "default.png" in img_url:
                                img_url = default_image_url
                            
                            image_list.append({
                                "player_name": name,
                                "team_name": team,
                                "image_url": img_url,
                            })
                        except Exception as e:
                            print(f"[오류] 선수 정보 추출 중 오류 발생: {e}")
                            continue
                except Exception as e:
                    print(f"[오류] 팀: {team}, 포지션: {position} 크롤링 중 오류 발생: {e}")
                    continue
    except Exception as e:
        print(f"[오류] 크롤링 초기화 중 오류 발생: {e}")
    finally:
        if driver:
            driver.quit()

    return image_list
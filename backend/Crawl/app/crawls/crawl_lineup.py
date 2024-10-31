import time
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

def crawl_lineup():
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
    
    lineup_list = []

    try:
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.get("https://www.koreabaseball.com/Schedule/GameCenter/Main.aspx")
        time.sleep(3)

        games = driver.find_elements(By.CSS_SELECTOR, ".game-cont")

        if not games:
            print("오늘 경기가 없거나 이미 종료되었습니다.")
            return []  # 빈 리스트 반환

        for game in games:
            # 경기별 ID와 정보 추출
            game_date_raw = game.get_attribute("g_dt")
            game_date = datetime.strptime(game_date_raw, '%Y%m%d').strftime('%Y-%m-%d')
            stadium = game.get_attribute("s_nm")
            away_team_name = game.get_attribute("away_nm")
            home_team_name = game.get_attribute("home_nm")

            game.click()
            time.sleep(2)

            # 라인업 분석 탭 존재 여부 확인
            lineup_tabs = driver.find_elements(By.LINK_TEXT, "라인업 분석")
            if lineup_tabs:
                lineup_tab = lineup_tabs[0]
                lineup_tab.click()
                time.sleep(2)

                game_data = {
                    "game_date": game_date,
                    "stadium": stadium,
                    "away_team_name": away_team_name,
                    "home_team_name": home_team_name,
                    "away_team": [],
                    "home_team": []
                }

                # 원정팀 라인업 가져오기
                away_team = driver.find_element(By.CSS_SELECTOR, "#tblAwayLineUp tbody")
                away_rows = away_team.find_elements(By.TAG_NAME, "tr")

                for row in away_rows:
                    columns = row.find_elements(By.TAG_NAME, "td")
                    if len(columns) > 1:
                        game_data['away_team'].append({
                            "batting_order": columns[0].text,
                            "position": columns[1].text,
                            "player": columns[2].text,
                            "war": columns[3].text
                        })

                # 홈팀 라인업 가져오기
                home_team = driver.find_element(By.CSS_SELECTOR, "#tblHomeLineUp tbody")
                home_rows = home_team.find_elements(By.TAG_NAME, "tr")

                for row in home_rows:
                    columns = row.find_elements(By.TAG_NAME, "td")
                    if len(columns) > 1:
                        game_data['home_team'].append({
                            "batting_order": columns[0].text,
                            "position": columns[1].text,
                            "player": columns[2].text,
                            "war": columns[3].text
                        })

                lineup_list.append(game_data)
            else:
                print("오늘 경기가 없거나 이미 종료되었습니다.")
                return []  # 빈 리스트 반환

            time.sleep(2)

    except Exception as e:
        print(f"크롤링 중 오류 발생: {e}")
        raise e

    finally:
        if driver:
            driver.quit()

    return lineup_list

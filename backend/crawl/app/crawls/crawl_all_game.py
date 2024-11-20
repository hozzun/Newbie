import re
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


def crawl_all_game():

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
    game_all_list = []
    year_list = ["2020", "2021", "2022", "2023", "2024"]
    month_list = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    season_dict = {
        "3,4,5,7": "포스트시즌",
        "0,9,6": "정규시즌"
    }

    try:
        driver = webdriver.Chrome(service=service, options=chrome_options)
        wait = WebDriverWait(driver, 10)
        
        last_date = None

        driver.get("https://www.koreabaseball.com/Schedule/Schedule.aspx")
        wait.until(EC.presence_of_element_located((By.ID, "ddlSeries")))

        for year_i in year_list:
            for month_j in month_list:
                for season_value, season_name in season_dict.items():
                    # 시즌, 연도, 월 선택
                    series_select = Select(driver.find_element(By.ID, "ddlSeries"))
                    series_select.select_by_value(season_value)
                    year_select = Select(driver.find_element(By.ID, "ddlYear"))
                    year_select.select_by_value(str(year_i))
                    month_select = Select(driver.find_element(By.ID, "ddlMonth"))
                    month_select.select_by_value(str(month_j))
                    
                    time.sleep(2)

                    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "tbody tr")))

                    # 경기 일정 추출
                    game_rows = driver.find_elements(By.CSS_SELECTOR, "tbody tr")

                    for row in game_rows:
                        columns = row.find_elements(By.TAG_NAME, "td")

                        if len(columns) == 9 and columns[8].text != "이동일":
                            date_raw = columns[0].text.strip()
                            
                            # 새로운 날짜가 있으면 last_date 업데이트
                            if date_raw:
                                match = re.match(r'(\d+)\.(\d+)', date_raw)
                                if match:
                                    month, day = match.groups()
                                    last_date = f"{year_i}-{month.zfill(2)}-{day.zfill(2)}"
                                    
                            date = last_date    
                            time_str = columns[1].text
                            
                            if columns[3].text == "리뷰":
                                game_result = "경기 종료"
                    
                            elif columns[3].text == "프리뷰":
                                game_result = "진행 예정"
                    
                            else:                                                           
                                game_result = "경기 취소"

                            stadium = columns[7].text

                            team_elements = columns[2].find_elements(By.TAG_NAME, "span")
                            if len(team_elements) > 3:
                                away_team = team_elements[0].text
                                home_team = team_elements[4].text
                                away_score = team_elements[1].text
                                home_score = team_elements[3].text
                            else:
                                away_team = team_elements[0].text
                                home_team = team_elements[2].text
                                away_score = "0"
                                home_score = "0"

                            game = {
                                "date": date,
                                "time": time_str,
                                "away_team": away_team,
                                "home_team": home_team,
                                "away_score": away_score,
                                "home_score": home_score,
                                "game_result": game_result,
                                "stadium": stadium,
                                "season": season_name
                            }

                            game_all_list.append(game)
                        
                        elif len(columns) == 8:                                   
                            date = last_date
                            time_str = columns[0].text
                            
                            if columns[2].text == "리뷰":
                                game_result = "경기 종료"
                    
                            elif columns[2].text == "프리뷰":
                                game_result = "진행 예정"
                    
                            else:                                                           
                                game_result = "경기 취소"

                            stadium = columns[6].text

                            team_elements = columns[1].find_elements(By.TAG_NAME, "span")
                            if len(team_elements) > 3:
                                away_team = team_elements[0].text
                                home_team = team_elements[4].text
                                away_score = team_elements[1].text
                                home_score = team_elements[3].text
                            else:
                                away_team = team_elements[0].text
                                home_team = team_elements[2].text
                                away_score = "0"
                                home_score = "0"

                            game = {
                                "date": date,
                                "time": time_str,
                                "away_team": away_team,
                                "home_team": home_team,
                                "away_score": away_score,
                                "home_score": home_score,
                                "game_result": game_result,
                                "stadium": stadium,
                                "season": season_name
                            }

                            game_all_list.append(game)

    except Exception as e:
        print(f"크롤링 중 오류 발생: {e}")
        if driver:
            driver.quit()  # 예외 발생 시 브라우저 종료
        raise e

    finally:
        if driver:
            driver.quit()  # 정상 실행 후에도 브라우저 종료

    return game_all_list

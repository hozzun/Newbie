import time
from datetime import datetime, timedelta
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

def crawl_game_record():
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
    
    game_record_list = []

    try:
        driver = webdriver.Chrome(service=service, options=chrome_options)
        wait = WebDriverWait(driver, 10)
        driver.get("https://www.koreabaseball.com/Schedule/GameCenter/Main.aspx")

        current_date_str = driver.find_element(By.ID, "nowDate").get_attribute("value")
        current_date = datetime.strptime(current_date_str, "%Y%m%d")
        end_date = current_date - timedelta(days=100)

        while current_date >= end_date:
            games = driver.find_elements(By.CSS_SELECTOR, ".game-cont")

            if not games:
                return []
            else:
                for game in games:
                    game_date_raw = game.get_attribute("g_dt")
                    game_date = datetime.strptime(game_date_raw, '%Y%m%d').strftime('%Y-%m-%d')
                    stadium = game.get_attribute("s_nm")
                    away_team_name = game.get_attribute("away_nm")
                    home_team_name = game.get_attribute("home_nm")
                    
                    # 선발 투수 이름에서 "승", "패" 등의 정보 제거
                    def get_pitcher_name(game_element, team_selector):
                        try:
                            pitcher_element = game_element.find_element(By.CSS_SELECTOR, f"{team_selector} .today-pitcher p")
                            pitcher_text = pitcher_element.text
                            # "승", "패" 텍스트를 제거
                            for unwanted_text in ["승", "패", "세"]:
                                pitcher_text = pitcher_text.replace(unwanted_text, "").strip()
                            return pitcher_text
                        except NoSuchElementException:
                            return None

                    # away와 home 팀의 선발 투수를 각 경기에 맞게 가져오기
                    away_starting_pitcher = get_pitcher_name(game, ".team.away")
                    home_starting_pitcher = get_pitcher_name(game, ".team.home")

                    game.click()
                    time.sleep(2)

                    review_tab = driver.find_elements(By.LINK_TEXT, "리뷰")
                    if review_tab:
                        review_tab[0].click()
                        time.sleep(2)

                        try:
                            stadium = driver.find_element(By.ID, "txtStadium").text.replace("구장 : ", "").strip()
                            crowd = driver.find_element(By.ID, "txtCrowd").text.replace("관중 : ", "").strip()
                            start_time = driver.find_element(By.ID, "txtStartTime").text.replace("개시 : ", "").strip()
                            end_time = driver.find_element(By.ID, "txtEndTime").text.replace("종료 : ", "").strip()
                            run_time = driver.find_element(By.ID, "txtRunTime").text.replace("경기시간 : ", "").strip()
                        except:
                            pass

                        # 실제 경기 진행된 이닝 수 계산
                        innings = driver.find_elements(By.CSS_SELECTOR, "#tblScordboard2 tbody tr")
                        if len(innings) >= 2:
                            away_score = [td.text for td in innings[0].find_elements(By.TAG_NAME, "td")]
                            home_score = [td.text for td in innings[1].find_elements(By.TAG_NAME, "td")]
                            inning_count = len([score for score in away_score if score != "-"])

                        # 팀별 기록 가져오기
                        try:
                            away_team_data = driver.find_elements(By.CSS_SELECTOR, "#tblScordboard3 tbody tr")[0].find_elements(By.TAG_NAME, "td")
                            home_team_data = driver.find_elements(By.CSS_SELECTOR, "#tblScordboard3 tbody tr")[1].find_elements(By.TAG_NAME, "td")

                            # 데이터가 예상대로 4개일 때만 값 할당
                            if len(away_team_data) == 4:
                                away_run, away_hit, away_error, away_base_on_balls = [int(td.text) for td in away_team_data]
                            else:
                                away_run, away_hit, away_error, away_base_on_balls = 0, 0, 0, 0

                            if len(home_team_data) == 4:
                                home_run, home_hit, home_error, home_base_on_balls = [int(td.text) for td in home_team_data]
                            else:
                                home_run, home_hit, home_error, home_base_on_balls = 0, 0, 0, 0
                        except (NoSuchElementException, IndexError):
                            print("팀 데이터 요소를 찾을 수 없습니다.")
                            away_run, away_hit, away_error, away_base_on_balls = 0, 0, 0, 0
                            home_run, home_hit, home_error, home_base_on_balls = 0, 0, 0, 0

                        game_details = {
                            'game_date': game_date,
                            'stadium': stadium,
                            'away_team_name': away_team_name,
                            'home_team_name': home_team_name,
                            'inning_count': inning_count,
                            'away_score': away_score,
                            'home_score': home_score,
                            'crowd': crowd,
                            'start_time': start_time,
                            'end_time': end_time,
                            'run_time': run_time,
                            'away_run': away_run,
                            'away_hit': away_hit,
                            'away_error': away_error,
                            'away_base_on_balls': away_base_on_balls,
                            'home_run': home_run,
                            'home_hit': home_hit,
                            'home_error': home_error,
                            'home_base_on_balls': home_base_on_balls,
                            'away_starting_pitcher': away_starting_pitcher,
                            'home_starting_pitcher': home_starting_pitcher,
                            'winning_hit': None,
                            'home_runs': [],
                            'doubles': [],
                            'triples': [],
                            'errors': [],
                            'stolen_bases': [],
                            'caught_stealing': [],
                            'double_plays': [],
                            'wild_pitches': [],
                            'umpires': []
                        }

                        rows = driver.find_elements(By.CSS_SELECTOR, "#tblEtc tbody tr")
                        for row in rows:
                            category = row.find_element(By.TAG_NAME, "th").text
                            detail = row.find_element(By.TAG_NAME, "td").text
                            if category == "결승타":
                                game_details['winning_hit'] = detail
                            elif category == "홈런":
                                game_details['home_runs'].extend(detail.split())
                            elif category == "2루타":
                                game_details['doubles'].extend(detail.split())
                            elif category == "3루타":
                                game_details['triples'].extend(detail.split())
                            elif category == "실책":
                                game_details['errors'].append(detail)
                            elif category == "도루":
                                game_details['stolen_bases'].append(detail)
                            elif category == "도루자":
                                game_details['caught_stealing'].append(detail)
                            elif category == "병살타":
                                game_details['double_plays'].extend(detail.split())
                            elif category == "폭투":
                                game_details['wild_pitches'].append(detail)
                            elif category == "심판":
                                game_details['umpires'].extend(detail.split())

                        game_record_list.append(game_details)

                    else:
                        print("리뷰 탭을 찾을 수 없습니다.")

            try:
                prev_button = wait.until(EC.element_to_be_clickable((By.ID, "lnkPrev")))
                prev_button.click()
                time.sleep(3)
            except TimeoutException:
                print("이전 버튼이 더 이상 존재하지 않거나 클릭할 수 없습니다. 크롤링 종료.")
                break

            current_date_str = driver.find_element(By.ID, "nowDate").get_attribute("value")
            current_date = datetime.strptime(current_date_str, "%Y%m%d")

    except Exception as e:
        print(f"크롤링 중 오류 발생: {e}")
    finally:
        driver.quit()
    
    return game_record_list
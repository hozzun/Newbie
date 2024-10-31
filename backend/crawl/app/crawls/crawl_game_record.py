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
        # print("페이지 로드 완료")

        current_date_str = driver.find_element(By.ID, "nowDate").get_attribute("value")
        current_date = datetime.strptime(current_date_str, "%Y%m%d")
        end_date = current_date - timedelta(days=30)
        # print(f"현재 날짜: {current_date}, 종료 날짜: {end_date}")

        while current_date >= end_date:
            # print(f"날짜 확인 중: {current_date.strftime('%Y-%m-%d')}")
            games = driver.find_elements(By.CSS_SELECTOR, ".game-cont")

            if not games:
                # print(f"{current_date.strftime('%Y-%m-%d')} 날짜에 경기가 없습니다.")
                return []
            else:
                # print(f"{len(games)}개의 경기 발견")

                for game in games:
                    game_date_raw = game.get_attribute("g_dt")
                    game_date = datetime.strptime(game_date_raw, '%Y%m%d').strftime('%Y-%m-%d')
                    stadium = game.get_attribute("s_nm")
                    away_team_name = game.get_attribute("away_nm")
                    home_team_name = game.get_attribute("home_nm")

                    game.click()
                    time.sleep(2)

                    review_tab = driver.find_elements(By.LINK_TEXT, "리뷰")
                    if review_tab:
                        review_tab[0].click()
                        time.sleep(2)
                        # print("리뷰 탭 클릭 완료")
                        
                        stadium = driver.find_element(By.ID, "txtStadium").text.replace("구장 : ", "").strip()
                        crowd = driver.find_element(By.ID, "txtCrowd").text.replace("관중 : ", "").strip()
                        start_time = driver.find_element(By.ID, "txtStartTime").text.replace("개시 : ", "").strip()
                        end_time = driver.find_element(By.ID, "txtEndTime").text.replace("종료 : ", "").strip()
                        run_time = driver.find_element(By.ID, "txtRunTime").text.replace("경기시간 : ", "").strip()
                        # print(f"기본 경기 정보 수집: 경기장={stadium}, 관중={crowd}, 개시={start_time}, 종료={end_time}, 시간={run_time}")
                        
                        # 선발 투수 이름에서 "승", "패" 등의 정보 제거
                        def get_pitcher_name(selector):
                            try:
                                pitcher_element = driver.find_element(By.CSS_SELECTOR, selector)
                                span = pitcher_element.find_element(By.TAG_NAME, "span")
                                return pitcher_element.text.replace(span.text, "").strip()
                            except NoSuchElementException:
                                return None

                        away_starting_pitcher = get_pitcher_name(".team.away .today-pitcher p")
                        home_starting_pitcher = get_pitcher_name(".team.home .today-pitcher p")
                        
                        innings = driver.find_elements(By.CSS_SELECTOR, "#tblScordboard2 tbody tr")
                        if len(innings) >= 2:  # away_score와 home_score 확인
                            away_score = [td.text for td in innings[0].find_elements(By.TAG_NAME, "td")]
                            home_score = [td.text for td in innings[1].find_elements(By.TAG_NAME, "td")]
                        # print(f"점수보드 수집 완료: away_score={away_score}, home_score={home_score}")

                        game_details = {
                            'game_date': game_date,
                            'stadium': stadium,
                            'away_team_name': away_team_name,
                            'home_team_name': home_team_name,
                            'away_score': away_score,
                            'home_score': home_score,
                            'crowd': crowd,
                            'start_time': start_time,
                            'end_time': end_time,
                            'run_time': run_time,
                            'away_starting_pitcher': away_starting_pitcher,
                            'home_starting_pitcher': home_starting_pitcher,
                            'winning_hit': None,
                            'home_runs': [],
                            'doubles': [],
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
                        # print(f"경기 세부 기록 수집 완료: {game_details}")

                        game_record_list.append(game_details)

                    else:
                        print("리뷰 탭을 찾을 수 없습니다.")

            try:
                prev_button = wait.until(EC.element_to_be_clickable((By.ID, "lnkPrev")))
                prev_button.click()
                time.sleep(3)
                # print("이전 날짜로 이동 완료")
            except TimeoutException:
                print("이전 버튼이 더 이상 존재하지 않거나 클릭할 수 없습니다. 크롤링 종료.")
                break

            current_date_str = driver.find_element(By.ID, "nowDate").get_attribute("value")
            current_date = datetime.strptime(current_date_str, "%Y%m%d")
            # print(f"새로운 현재 날짜: {current_date}")

    except Exception as e:
        print(f"크롤링 중 오류 발생: {e}")
    finally:
        driver.quit()
        # print("드라이버 종료 완료")

    # print("최종 수집된 경기 기록 목록:")
    # for record in game_record_list:
    #     print(record)
    
    return game_record_list

# 함수 실행 시 최종 결과 출력
# results = crawl_game_record()
# print("최종 크롤링 결과:", results)

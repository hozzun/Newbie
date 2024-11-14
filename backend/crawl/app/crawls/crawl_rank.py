import datetime
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
from selenium.webdriver.common.by import By

def crawl_rank():
    now = datetime.datetime.now()
    current_year = now.year
    start_year = 2020
    rank_list = []

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

    for year in range(start_year, current_year + 1):
        try:
            # 매 연도별로 새롭게 드라이버를 실행
            driver = webdriver.Chrome(service=service, options=chrome_options)
            wait = WebDriverWait(driver, 10)

            driver.get("https://www.koreabaseball.com/Record/TeamRank/TeamRank.aspx")
            wait.until(EC.presence_of_element_located((By.ID, "cphContents_cphContents_cphContents_ddlYear")))

            # 드롭다운 클릭 후 연도 선택
            dropdown = driver.find_element(By.ID, "cphContents_cphContents_cphContents_ddlYear")
            dropdown.click()
            time.sleep(2)  # 드롭다운이 열리도록 잠시 대기

            # Select 객체로 연도 선택
            year_select = Select(dropdown)
            year_select.select_by_value(str(year))
            time.sleep(2)  # 페이지 로딩 시간을 기다림

            # 페이지가 완전히 로드되었는지 확인
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "tbody tr")))

            # 순위 데이터를 가져오기
            rank_rows = driver.find_elements(By.CSS_SELECTOR, "tbody tr")[:10]
            
            # 반복적으로 시도하여 데이터 수집
            for row in rank_rows:
                columns = row.find_elements(By.TAG_NAME, "td")
                
                if len(columns) == 12:
                    rank = {
                        "year": year,
                        "rank": columns[0].text,
                        "team": columns[1].text,
                        "game_count": columns[2].text,
                        "win_count": columns[3].text,
                        "lose_count": columns[4].text,
                        "draw_count": columns[5].text,
                        "win_rate": columns[6].text,
                        "game_diff": columns[7].text,
                        "recent_10": columns[8].text,
                        "streak": columns[9].text,
                    }
                    rank_list.append(rank)
            
            print(f"{year}년 데이터 저장 완료")
            time.sleep(2)

        except (StaleElementReferenceException, TimeoutException) as e:
            print(f"{year}년 데이터 수집 중 오류 발생: {e}, 재시도 중...")
            continue
        except Exception as e:
            print(f"{year}년 데이터 수집 중 오류 발생: {e}")
        finally:
            if driver:
                driver.quit()  # 매번 드라이버 종료

    return rank_list

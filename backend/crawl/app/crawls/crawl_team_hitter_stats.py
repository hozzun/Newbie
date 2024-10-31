import time
from datetime import datetime
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

def crawl_team_hitter_stats():
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
    
    team_hitter_stats = []
    current_year = datetime.now().year

    try:
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.get("https://www.koreabaseball.com/Record/Team/Hitter/Basic1.aspx")
        time.sleep(3)

        # 드롭다운 메뉴를 선택합니다.
        dropdown = Select(driver.find_element(By.ID, "cphContents_cphContents_cphContents_ddlSeries_ddlSeries"))
        dropdown.select_by_value("0")
        time.sleep(2)
        
        rows = driver.find_elements(By.CSS_SELECTOR, "#cphContents_cphContents_cphContents_udpContent > div.record_result > table > tbody > tr")
        
        for row in rows:
            columns = row.find_elements(By.TAG_NAME, "td")
            
            team_stats = {
                "year": str(current_year),
                "rank": columns[0].text,
                "team_name": columns[1].text,
                "avg": columns[2].text,
                "game_count": columns[3].text,
                "pa": columns[4].text,
                "ab": columns[5].text,
                "r": columns[6].text,
                "h": columns[7].text,
                "two": columns[8].text,
                "three": columns[9].text,
                "homerun": columns[10].text,
                "tb": columns[11].text,
                "rbi": columns[12].text,
                "sac": columns[13].text,
                "sf": columns[14].text,
            }
            team_hitter_stats.append(team_stats)

    except Exception as e:
        print(f"크롤링 중 오류 발생: {e}")
        if driver:
            driver.quit()
        raise e

    finally:
        if driver:
            driver.quit()

    return team_hitter_stats

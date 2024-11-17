import time
from datetime import datetime
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def crawl_team_pitcher_stats():
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
    
    team_pitcher_stats = []
    # current_year = datetime.now().year
    year_list = ["2020", "2021", "2022", "2023", "2024"]

    try:
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.get("https://www.koreabaseball.com/Record/Team/Pitcher/Basic1.aspx")
        time.sleep(3)

        # 드롭다운 메뉴를 선택합니다.
        dropdown = Select(driver.find_element(By.ID, "cphContents_cphContents_cphContents_ddlSeries_ddlSeries"))
        dropdown.select_by_value("0")
        time.sleep(2)
        
        # 여기
        for year in year_list:
            year_select = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.ID, "cphContents_cphContents_cphContents_ddlSeason_ddlSeason"))
                )
            Select(year_select).select_by_value(year)
            time.sleep(2)
            #까지
        
            rows = driver.find_elements(By.CSS_SELECTOR, "#cphContents_cphContents_cphContents_udpContent > div.record_result > table > tbody > tr")
            
            for row in rows:
                columns = row.find_elements(By.TAG_NAME, "td")
                
                team_stats = {
                    "year": str(year),
                    "rank": columns[0].text,
                    "team_name": columns[1].text,
                    "era": columns[2].text,
                    "game_count": columns[3].text,
                    "win": columns[4].text,
                    "lose": columns[5].text,
                    "save": columns[6].text,
                    "hld": columns[7].text,
                    "wpct": columns[8].text,
                    "ip": columns[9].text,
                    "h": columns[10].text,
                    "hr": columns[11].text,
                    "bb": columns[12].text,
                    "hbp": columns[13].text,
                    "so": columns[14].text,
                    "r": columns[15].text,
                    "er": columns[16].text,
                    "whip": columns[17].text,
                }
                team_pitcher_stats.append(team_stats)

    except Exception as e:
        print(f"크롤링 중 오류 발생: {e}")
        if driver:
            driver.quit()
        raise e

    finally:
        if driver:
            driver.quit()

    return team_pitcher_stats

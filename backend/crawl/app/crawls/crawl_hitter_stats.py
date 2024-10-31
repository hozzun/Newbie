import time
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def crawl_hitter_stats():
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
    
    hitter_stats = []
    current_year = datetime.now().year
    team_list = ["HT", "SS", "LG", "OB", "KT", "SK", "LT", "HH", "NC", "WO"]

    try:
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.get("https://www.koreabaseball.com/Record/Player/HitterBasic/Basic1.aspx?sort=HRA_RT")
        time.sleep(3)

        season_select = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "cphContents_cphContents_cphContents_ddlSeries_ddlSeries"))
        )
        Select(season_select).select_by_value("0")
        time.sleep(2)
        
        for team in team_list:
            team_select = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.ID, "cphContents_cphContents_cphContents_ddlTeam_ddlTeam"))
                )
            Select(team_select).select_by_value(team)
            time.sleep(2)
            
            first_page_button = driver.find_element(By.ID, "cphContents_cphContents_cphContents_ucPager_btnNo1")
            first_page_button.click()
            time.sleep(2)
            
            page_num = 1
            while True:
            
                rows = driver.find_elements(By.CSS_SELECTOR, "#cphContents_cphContents_cphContents_udpContent > div.record_result > table > tbody > tr")
                
                for row in rows:
                    columns = row.find_elements(By.TAG_NAME, "td")
                    
                    player_stats = {
                        "year": str(current_year),
                        "player_name": columns[1].find_element(By.TAG_NAME, "a").text,
                        "team_name": columns[2].text,
                        "avg": columns[3].text,
                        "game_count": columns[4].text,
                        "pa": columns[5].text,
                        "ab": columns[6].text,
                        "r": columns[7].text,
                        "h": columns[8].text,
                        "two": columns[9].text,
                        "three": columns[10].text,
                        "homerun": columns[11].text,
                        "tb": columns[12].text,
                        "rbi": columns[13].text,
                        "sac": columns[14].text,
                        "sf": columns[15].text,
                    }
                    hitter_stats.append(player_stats)
                    
                try:
                    next_page = driver.find_element(By.ID, f"cphContents_cphContents_cphContents_ucPager_btnNo{page_num + 1}")
                    next_page.click()
                    time.sleep(2)
                    page_num += 1
                except Exception:
                    print(f"{team} 팀의 모든 페이지를 크롤링 완료")
                    break  # 더 이상 페이지가 없을 경우 루프 종료

    except Exception as e:
        print(f"크롤링 중 오류 발생: {e}")
        if driver:
            driver.quit()
        raise e

    finally:
        if driver:
            driver.quit()

    return hitter_stats

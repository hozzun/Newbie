import time
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def crawl_pitcher_stats():
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
    
    pitcher_stats = []
    # current_year = datetime.now().year
    #여기
    year_list = ["2020", "2021", "2022", "2023", "2024"]
    team_list = ["HT", "SS", "LG", "OB", "KT", "SK", "LT", "HH", "NC", "WO"]

    try:
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.get("https://www.koreabaseball.com/Record/Player/PitcherBasic/Basic1.aspx")
        time.sleep(3)
        
        season_select = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "cphContents_cphContents_cphContents_ddlSeries_ddlSeries"))
        )
        Select(season_select).select_by_value("0")
        time.sleep(2)
        
        # 여기
        for year in year_list:
            print(f"{year} 크롤링 중")
            year_select = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.ID, "cphContents_cphContents_cphContents_ddlSeason_ddlSeason"))
                )
            Select(year_select).select_by_value(year)
            time.sleep(2)
            #까지
        
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
                            "year": str(year),
                            "player_name": columns[1].find_element(By.TAG_NAME, "a").text,
                            "team_name": columns[2].text,
                            "era": columns[3].text,
                            "game_count": columns[4].text,
                            "win": columns[5].text,
                            "lose": columns[6].text,
                            "save": columns[7].text,
                            "hld": columns[8].text,
                            "wpct": columns[9].text,
                            "ip": columns[10].text,
                            "h": columns[11].text,
                            "hr": columns[12].text,
                            "bb": columns[13].text,
                            "hbp": columns[14].text,
                            "so": columns[15].text,
                            "r": columns[16].text,
                            "er": columns[17].text,
                            "whip": columns[18].text,
                        }
                        pitcher_stats.append(player_stats)
                        
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

    return pitcher_stats

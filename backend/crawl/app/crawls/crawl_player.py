import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


def crawl_player():

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
    player_list = []
    team_list = ["HT", "SS", "LG", "OB", "KT", "SK", "LT", "HH", "NC", "WO"]

    try:
        driver = webdriver.Chrome(service=service, options=chrome_options)
        wait = WebDriverWait(driver, 10)

        driver.get("https://www.koreabaseball.com/Player/Search.aspx")
        wait.until(EC.presence_of_element_located((By.ID, "cphContents_cphContents_cphContents_ddlTeam")))

        for team_code in team_list:
            team_select = Select(driver.find_element(By.ID, "cphContents_cphContents_cphContents_ddlTeam"))
            team_select.select_by_value(team_code)
            
            wait.until(EC.presence_of_element_located((By.ID, "cphContents_cphContents_cphContents_ddlPosition")))
            time.sleep(3)
            
            last_page = False
            while not last_page:
                # 현재 페이지 그룹의 페이지 번호들을 가져옴
                page_buttons = driver.find_elements(By.CSS_SELECTOR, "div.paging a")
                page_numbers = []
                for button in page_buttons:
                    try:
                        page_number = int(button.text)
                        page_numbers.append(page_number)
                    except ValueError:
                        continue  # "다음", "끝" 등의 버튼은 숫자가 아니므로 제외

                # 각 페이지로 이동하여 선수 데이터 크롤링
                for page_num in page_numbers:
                    try:
                        # 페이지 번호 클릭
                        page_link = driver.find_element(By.XPATH, f"//a[text()='{page_num}']")
                        page_link.click()
                        time.sleep(3)
                        
                        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "tbody tr")))
    
                        # 선수 목록 추출
                        player_rows = driver.find_elements(By.CSS_SELECTOR, "tbody tr")
                        
                        for row in player_rows:
                            columns = row.find_elements(By.TAG_NAME, "td")
                            
                            if len(columns) == 7:
                                back_number = columns[0].text
                                name = columns[1].text
                                team = columns[2].text
                                position = columns[3].text
                                birth = columns[4].text
                                physical = columns[5].text
                                academic = columns[6].text
                                
                                if not back_number.strip():
                                    back_number = "미정"
                                
                                if team != "고양":
                                    player = {
                                        "back_number": back_number,
                                        "name": name,
                                        "team": team,
                                        "position": position,
                                        "birth": birth,
                                        "physical": physical,
                                        "academic": academic,
                                    }
                                    player_list.append(player)
                    except Exception as e:
                        print(f"페이지 {page_num} 크롤링 중 오류 발생: {e}")
                        continue

                # "다음" 버튼이 있으면 클릭하여 다음 페이지 그룹으로 이동
                try:
                    next_button = driver.find_element(By.XPATH, "//a[text()='다음']")
                    next_button.click()
                    time.sleep(3)
                except Exception:
                    # "다음" 버튼이 없으면 마지막 페이지 그룹이므로 종료
                    last_page = True

    except Exception as e:
        print(f"크롤링 중 오류 발생: {e}")
        if driver:
            driver.quit()
        raise e

    finally:
        if driver:
            driver.quit()

    return player_list



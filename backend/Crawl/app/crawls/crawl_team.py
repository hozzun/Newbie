import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


def crawl_team():

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
    team_list = []

    try:
        driver = webdriver.Chrome(service=service, options=chrome_options)
        wait = WebDriverWait(driver, 10)

        driver.get("https://sports.daum.net/record/kbo")
        wait.until(EC.presence_of_element_located((By.ID, "daumContent")))
        time.sleep(3)

        teams = driver.find_elements(By.CSS_SELECTOR, ".tbl_record tbody tr")[:10]
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".tbl_record tbody tr")))

        for team in teams:
            team_name = team.find_element(By.CSS_SELECTOR, ".txt_name").text.strip()
            team_logo = team.find_element(By.CSS_SELECTOR, ".wrap_thumb img").get_attribute("src")

            team_info = {
                "team_name": team_name,
                "team_logo": team_logo,
            }

            team_list.append(team_info)
        
    except Exception as e:
        print(f"크롤링 중 오류 발생: {e}")
        if driver:
            driver.quit()
        raise e

    finally:
        if driver:
            driver.quit()

    return team_list
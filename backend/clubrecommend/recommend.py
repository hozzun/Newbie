import random

# 팀 데이터
team_data = {
    1: ["두산", "LG", "롯데"],
    2: ["KIA", "키움", "NC"],
    3: ["삼성", "두산", "한화"],
    4: ["키움", "NC", "KT"],
    5: ["KIA", "삼성", "LG"],
    6: ["KT", "SSG", "한화"],
    7: ["롯데", "SSG", "LG"],
    8: ["삼성", "한화", "NC"]
}

# 지역별 팀
region_data = {
    "서울": ["두산", "LG", "키움"],
    "부산": ["롯데"],
    "광주": ["KIA"],
    "대구": ["삼성"],
    "인천": ["SSG"],
    "대전": ["한화"],
    "경기": ["KT"],
    "충청": ["한화"],
    "세종": ["한화"],
    "전라": ["KIA"],
    "경상": ["삼성", "NC", "롯데"],
    "강원": ["두산", "LG", "키움", "롯데", "KIA", "삼성", "NC", "한화", "KT", "SSG"],
    "제주": ["두산", "LG", "키움", "롯데", "KIA", "삼성", "NC", "한화", "KT", "SSG"]
}

# mbti별 팀
mbti_data = {
    'ISTJ': ["두산", "삼성"],
    'ISFJ': ["두산", "한화"],
    'INFJ': ["LG", "NC"],
    'INTJ': ["NC", "KT"],
    'ISTP': ["SSG", "키움"],
    'ISFP': ["키움", "한화"],
    'INFP': ["SSG", "한화"],
    'INTP': ["KT", "NC"],
    'ESTP': ["롯데", "SSG"],
    'ESFP': ["LG", "롯데"],
    'ESFJ': ["KIA", "LG"],
    'ENTP': ["SSG", "키움"],
    'ENFP': ["LG", "KT"],
    'ENTJ': ["NC", "삼성"],
    'ESTJ': ["KIA", "삼성"],
    'ENFJ': ["롯데", "KIA"],
}

def region_team(mbti, region, region_data, team_count):

    region_teams = region_data.get(region, [])
    regional_count = {team: team_count.get(team, 0) for team in region_teams}
    max_count = max(regional_count.values(), default=0)
    recommended_teams = [team for team, count in regional_count.items() if count == max_count]

    if len(recommended_teams) >= 2:
        return mbti_team(mbti, regional_count)
    else:
        return recommended_teams


def mbti_team(mbti, team_count):
    
    mbti_teams = mbti_data.get(mbti, [])
    
    for team in mbti_teams:
        if team in team_count:
            team_count[team] += 1
    
    max_count = max(team_count.values(), default=0)
    final_team = [team for team, count in team_count.items() if count == max_count]
    
    return random.choice(final_team)


def recommend_team(mbti, responses, region):
    
    team_count = {}

    for response in responses:
        teams = team_data.get(response)
        if teams:
            for team in teams:
                if team in team_count:
                    team_count[team] += 1
                else:
                    team_count[team] = 1

    if region:
        return region_team(mbti, region, region_data, team_count)
    
    else:
        max_count = max(team_count.values(), default=0)
        recommended_teams = [team for team, count in team_count.items() if count == max_count]

        if len(recommended_teams) >= 2:
            return mbti_team(mbti, team_count)
        else:
            return recommended_teams

# 사용자 입력 예시
# mbti = 'INFJ'
# user_responses = [2, 4, 5, 8]
# region = ""

# 추천 팀 반환
# result = recommend_team(mbti, user_responses, region)
# print(result)

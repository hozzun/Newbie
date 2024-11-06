import random

# 팀 데이터
team_data = {
    1: ["doosan", "lg", "lotte"],
    2: ["kia", "kiwoom", "nc"],
    3: ["samsung", "doosan", "hanwha"],
    4: ["kiwoom", "nc", "kt"],
    5: ["kia", "samsung", "lg"],
    6: ["kt", "ssg", "hanwha"],
    7: ["lotte", "ssg", "lg"],
    8: ["samsung", "hanwha", "nc"]
}

# 지역별 팀
region_data = {
    "서울": ["doosan", "lg", "kiwoom"],
    "부산": ["lotte"],
    "광주": ["kia"],
    "대구": ["samsung"],
    "인천": ["ssg"],
    "대전": ["hanwha"],
    "경기": ["kt", "lg"],
    "충청": ["hanwha"],
    "세종": ["hanwha"],
    "전라": ["kia"],
    "경상": ["samsung", "nc", "lotte"],
    "강원": ["doosan", "lg", "kiwoom", "lotte", "kia", "samsung", "nc", "hanwha", "kt", "ssg"],
    "제주": ["doosan", "lg", "kiwoom", "lotte", "kia", "samsung", "nc", "hanwha", "kt", "ssg"]
}

# mbti별 팀
mbti_data = {
    'ISTJ': ["doosan", "samsung"],
    'ISFJ': ["doosan", "hanwha"],
    'INFJ': ["lg", "nc"],
    'INTJ': ["NC", "kt"],
    'ISTP': ["ssg", "kiwoom"],
    'ISFP': ["kiwoom", "hanwha"],
    'INFP': ["ssg", "hanwha"],
    'INTP': ["kt", "nc"],
    'ESTP': ["lotte", "ssg"],
    'ESFP': ["LG", "lotte"],
    'ESFJ': ["kia", "lg"],
    'ENTP': ["ssg", "kiwoom"],
    'ENFP': ["lg", "kt"],
    'ENTJ': ["nc", "samsung"],
    'ESTJ': ["kia", "samsung"],
    'ENFJ': ["lotte", "kia"],
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
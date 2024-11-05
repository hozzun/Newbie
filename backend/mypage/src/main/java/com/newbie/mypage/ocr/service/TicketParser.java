package com.newbie.mypage.ocr.service;

import org.json.simple.JSONArray;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TicketParser {

    private static final Map<String, String> teamMapping = Map.ofEntries(
            Map.entry("K", "키움 히어로즈"),
            Map.entry("KIWOOM", "키움 히어로즈"),
            Map.entry("KIA", "KIA 타이거즈"),
            Map.entry("SAMSUNG", "삼성 라이온즈"),
            Map.entry("SSG", "SSG 랜더스"),
            Map.entry("NC", "NC 다이노스"),
            Map.entry("LOTTE", "롯데 자이언츠"),
            Map.entry("KT", "KT 위즈"),
            Map.entry("HANWHA", "한화 이글스"),
            Map.entry("LG", "LG 트윈스"),
            Map.entry("DOOSAN", "두산 베어스")
    );

    // 영문명 원본과 표기된 형태를 매핑
    private static final Map<String, String> teamEnglishNameMap = Map.ofEntries(
            Map.entry("K", "kiwoom"),
            Map.entry("KIWOOM", "kiwoom"),
            Map.entry("KIA", "kia"),
            Map.entry("SAMSUNG", "samsung"),
            Map.entry("SSG", "ssg"),
            Map.entry("NC", "nc"),
            Map.entry("LOTTE", "lotte"),
            Map.entry("KT", "kt"),
            Map.entry("HANWHA", "hanwha"),
            Map.entry("LG", "lg"),
            Map.entry("DOOSAN", "doosan")
    );

    public Map<String, Object> parseTicketInfo(JSONArray ticketData) throws ParseException {
        String datePattern = "\\d{4}\\.\\d{1,2}\\.\\d{1,2}";
        String ticketDate = null;
        List<String> teamKoreanList = new ArrayList<>();
        List<String> teamEnglishList = new ArrayList<>();

        for (Object obj : ticketData) {
            String text = (String) obj;

            // 첫 번째로 나오는 날짜를 ticketDate로 설정
            if (ticketDate == null && text.matches(datePattern)) {
                ticketDate = text;
            }

            // 구단명 추출
            if (teamMapping.containsKey(text)) {
                teamEnglishList.add(teamEnglishNameMap.get(text)); // 영문명을 소문자로 변환하여 추가
                teamKoreanList.add(teamMapping.get(text));
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("date", ticketDate);
        response.put("teamEnglish", teamEnglishList);
        response.put("teamKorean", teamKoreanList);

        return response;
    }
}

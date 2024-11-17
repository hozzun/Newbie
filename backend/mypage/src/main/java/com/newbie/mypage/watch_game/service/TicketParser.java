package com.newbie.mypage.watch_game.service;

import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class TicketParser {

    private static final Map<String, String> teamMapping = Map.ofEntries(
            // 영어 키
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
            Map.entry("DOOSAN", "두산 베어스"),
            // 한글 키
            Map.entry("키움", "키움 히어로즈"),
            Map.entry("기아", "KIA 타이거즈"),
            Map.entry("삼성", "삼성 라이온즈"),
            Map.entry("롯데", "롯데 자이언츠"),
            Map.entry("한화", "한화 이글스"),
            Map.entry("두산", "두산 베어스")
    );

    private static final Map<String, String> teamEnglishNameMap = Map.ofEntries(
            // 영어 키
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
            Map.entry("DOOSAN", "doosan"),
            // 한글 키
            Map.entry("키움", "kiwoom"),
            Map.entry("기아", "kia"),
            Map.entry("삼성", "samsung"),
            Map.entry("롯데", "lotte"),
            Map.entry("한화", "hanwha"),
            Map.entry("두산", "doosan")
    );


    public Map<String, Object> parseTicketInfo(JSONArray ticketData) throws ParseException {
        String datePattern = "\\d{4}[-./]\\d{1,2}[-./]\\d{1,2}(\\(.+?\\))?";
        String timePattern = "\\d{1,2}시( \\d{1,2}분)?";

        String ticketDate = null;
        String ticketTime = null;

        List<String> teamKoreanList = new ArrayList<>();
        List<String> teamEnglishList = new ArrayList<>();

        for (Object obj : ticketData) {
            String text = ((String) obj).trim();
            String cleanedText = text.replaceAll("\\s+", ""); // 공백 제거

            // 날짜 추출
            if (ticketDate == null && cleanedText.matches(datePattern)) {
                // 괄호 제거
                ticketDate = cleanedText.replaceAll("\\(.+?\\)", "");
            }

            // 시간 추출
            if (ticketTime == null && text.matches(timePattern)) {
                ticketTime = text;
            }

            // 구단명 추출
            if (teamMapping.containsKey(text)) {
                teamKoreanList.add(teamMapping.get(text));
                teamEnglishList.add(teamEnglishNameMap.get(text));
            }
        }

        log.info("Extracted Date: {}", ticketDate);
        log.info("Extracted Time: {}", ticketTime);
        log.info("Team English List: {}", teamEnglishList);
        log.info("Team Korean List: {}", teamKoreanList);

        if (ticketDate == null) {
            throw new IllegalArgumentException("날짜 정보가 누락되었습니다.");
        }
        if (ticketTime == null) {
            throw new IllegalArgumentException("시간 정보가 누락되었습니다.");
        }
        if (teamKoreanList.size() < 2 || teamEnglishList.size() < 2) {
            throw new IllegalArgumentException("팀 이름 정보가 누락되었거나 부족합니다.");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("date", ticketDate);
        response.put("time", ticketTime);
        response.put("teamKorean", teamKoreanList);
        response.put("teamEnglish", teamEnglishList);

        return response;
    }


}

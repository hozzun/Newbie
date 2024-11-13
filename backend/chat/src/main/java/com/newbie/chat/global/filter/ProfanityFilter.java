package com.newbie.chat.global.filter;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ProfanityFilter {

    private final Set<String> bannedWords;

    public ProfanityFilter() {
        // 금칙어 목록 파일을 읽어서 로드
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(
                new ClassPathResource("profanity-words.txt").getInputStream(), StandardCharsets.UTF_8))) {
            this.bannedWords = reader.lines()
                    .map(String::trim)
                    .filter(line -> !line.isEmpty())
                    .collect(Collectors.toSet());
        } catch (Exception e) {
            throw new RuntimeException("Failed to load profanity words", e);
        }
    }

    public boolean containsProfanity(String message) {
        for (String word : bannedWords) {
            if (message.contains(word)) {
                System.out.println("Profanity detected: " + word);
                return true;
            }
        }
        return false;
    }
}
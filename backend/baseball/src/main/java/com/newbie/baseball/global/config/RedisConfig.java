package com.newbie.baseball.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@EnableCaching
@Configuration
public class RedisConfig {

    @Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.port}")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        redisStandaloneConfiguration.setHostName(host);
        redisStandaloneConfiguration.setPort(port);
        return new LettuceConnectionFactory(redisStandaloneConfiguration);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        return redisTemplate;
    }

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory redisConnectionFactory) {
        // gamesCache: 6시간 TTL
        RedisCacheConfiguration gamesCacheConfig = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofHours(6));

        RedisCacheConfiguration playerCacheConfig = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofHours(6));

        RedisCacheConfiguration rankCacheConfig = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofHours(6));

//        // teamSongsCache: 15시간 TTL
//        RedisCacheConfiguration teamSongsCacheConfig = RedisCacheConfiguration.defaultCacheConfig()
//                .entryTtl(Duration.ofHours(15));
//
//        // playerSongsCache: 15시간 TTL
//        RedisCacheConfiguration playerSongsCacheConfig = RedisCacheConfiguration.defaultCacheConfig()
//                .entryTtl(Duration.ofHours(15));

        // 각 캐시에 대해 설정 매핑
        Map<String, RedisCacheConfiguration> cacheConfigurations = new HashMap<>();
        cacheConfigurations.put("gamesCache", gamesCacheConfig);
        cacheConfigurations.put("playerCache", playerCacheConfig);
        cacheConfigurations.put("rankCache", rankCacheConfig);
//        cacheConfigurations.put("teamSongsCache", teamSongsCacheConfig);
//        cacheConfigurations.put("playerSongsCache", playerSongsCacheConfig);

        // RedisCacheManager 빌더에 캐시 설정 적용
        return RedisCacheManager.builder(redisConnectionFactory)
                .withInitialCacheConfigurations(cacheConfigurations) // 각 캐시별 설정
                .build(); // 기본 캐시 TTL은 설정하지 않음
    }
}

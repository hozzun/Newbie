package com.newbie.baseball;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class BaseballApplication {

	public static void main(String[] args) {
		SpringApplication.run(BaseballApplication.class, args);
	}

}

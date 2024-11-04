package com.newbie.mileage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationPropertiesScan
@SpringBootApplication
public class MileageApplication {

	public static void main(String[] args) {
		SpringApplication.run(MileageApplication.class, args);
	}

}

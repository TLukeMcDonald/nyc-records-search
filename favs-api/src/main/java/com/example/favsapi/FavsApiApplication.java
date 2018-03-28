package com.example.favsapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableEurekaClient
@RestController
public class FavsApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(FavsApiApplication.class, args);
	}
}
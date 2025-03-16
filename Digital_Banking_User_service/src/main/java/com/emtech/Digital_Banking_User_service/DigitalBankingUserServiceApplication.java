package com.emtech.Digital_Banking_User_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "com.emtech.Digital_Banking_User_Service.clients")  // Ensure Feign clients are scanned
public class DigitalBankingUserServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DigitalBankingUserServiceApplication.class, args);
	}

}

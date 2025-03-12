package com.emtech.Digital_Banking_APIGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient  // Enables API Gateway to register with Eureka

public class DigitalBankingApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(DigitalBankingApiGatewayApplication.class, args);
	}

}

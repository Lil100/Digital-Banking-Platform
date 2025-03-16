package com.emtech.Digital_Banking_APIGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.emtech.Digital_Banking_APIGateway")
public class DigitalBankingApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(DigitalBankingApiGatewayApplication.class, args);
	}

}

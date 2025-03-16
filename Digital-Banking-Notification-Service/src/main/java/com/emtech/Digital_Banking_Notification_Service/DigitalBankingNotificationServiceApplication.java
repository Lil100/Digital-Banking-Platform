package com.emtech.Digital_Banking_Notification_Service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
@EnableDiscoveryClient
public class DigitalBankingNotificationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DigitalBankingNotificationServiceApplication.class, args);
	}

}

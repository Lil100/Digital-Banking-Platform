package com.emtech.Digital_Banking_Audit.Logging_Service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
//import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
//@EnableFeignClients(basePackages = "com.emtech.Digital_Banking_Audit.Logging_Service.client")
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}

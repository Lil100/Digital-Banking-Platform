package com.emtech.Digital_Banking_User_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200", "http://172.16.2.61:4200/", "http://172.16.1.166:4200/") // Specific allowed origins
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                        .allowedHeaders("Authorization", "Content-Type", "X-Requested-With") // Allowed headers
                        .exposedHeaders("Authorization", "Content-Type") // Headers to expose
                        .allowCredentials(true); // Allow credentials (cookies, authorization headers)
            }
        };
    }
}

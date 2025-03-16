package com.bankingplatform.transactionservice;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();

        // ✅ Define allowed origins - Change this to your front-end domain
        corsConfig.setAllowedOrigins(List.of("http://172.16.2.61:4200", "http://172.16.1.166:4200"));

        // ✅ Allowed HTTP methods
        corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // ✅ Allowed headers
        corsConfig.setAllowedHeaders(List.of("Authorization", "Content-Type"));

        // ✅ Allow credentials for authentication
        corsConfig.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsFilter(source);
    }
}


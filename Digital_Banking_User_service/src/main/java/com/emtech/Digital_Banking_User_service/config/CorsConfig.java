package com.emtech.Digital_Banking_User_service.config;


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
        corsConfig.setAllowedOrigins(List.of("http://localhost:4200", "https://yourfrontenddomain.com"));

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

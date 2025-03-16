package com.emtech.Digital_Banking_Notification_Service.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfig = new CorsConfiguration();

        // ✅ Allow credentials for authentication
        corsConfig.setAllowCredentials(true);

        // ✅ Allowed origins - Use specific domains for security in production
        corsConfig.setAllowedOrigins(List.of("http://172.16.1.166:4200", "http://172.16.2.61:4200"));

        // ✅ Allowed HTTP methods
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // ✅ Allowed headers
        corsConfig.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));

        // ✅ Expose headers if needed
        corsConfig.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));

        // ✅ Apply CORS settings to all endpoints
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsFilter(source);
    }
}

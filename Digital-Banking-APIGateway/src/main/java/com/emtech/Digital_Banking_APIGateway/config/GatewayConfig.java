package com.emtech.Digital_Banking_APIGateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("audit-service", r -> r.path("/api/audit/**")
                        .uri("http://localhost:9091"))
                .route("auth-service", r -> r.path("/api/users/**")
                        .uri("http://localhost:9090"))
                .route("accounts-service", r -> r.path("/api/accounts/**")
                        .uri("http://localhost:9083"))
                .route("customers-service", r -> r.path("/api/customers/**")
                        .uri("http://localhost:9083"))
                .route("transactions-service", r -> r.path("/api/transactions/**")
                        .uri("http://localhost:9084"))
                .route("notifications-service", r -> r.path("/api/notifications/**")
                        .uri("http://localhost:9085"))
                .build();
    }
}
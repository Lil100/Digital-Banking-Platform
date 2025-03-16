//package com.emtech.Digital_Banking_Audit.Logging_Service.security;
//
//import com.emtech.Digital_Banking_Audit.Logging_Service.client.AuthServiceClient;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.io.IOException;
//
//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    private final AuthServiceClient authServiceClient;
//    private final UserDetailsService userDetailsService;
//
//    @Autowired
//    public JwtAuthenticationFilter(AuthServiceClient authServiceClient, UserDetailsService userDetailsService) {
//        this.authServiceClient = authServiceClient;
//        this.userDetailsService = userDetailsService;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain) throws ServletException, IOException {
//        String authHeader = request.getHeader("Authorization");
//
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String token = authHeader.substring(7);
//
//        try {
//            // ✅ Call Auth Service via Feign Client to validate token
//            Boolean isValid = authServiceClient.validateToken(token).getBody(); // Extract body
//
//            if (isValid == null || !isValid) {  // Check validity
//                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
//                return;
//            }
//
//            // ✅ Extract email from token
//            String email = authServiceClient.extractUsername(token).getBody(); // Extract body
//
//            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
//                UsernamePasswordAuthenticationToken authentication =
//                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//
//                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//
//        } catch (Exception e) {
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication Failed");
//            return;
//        }
//
//
//        filterChain.doFilter(request, response);
//    }
//}

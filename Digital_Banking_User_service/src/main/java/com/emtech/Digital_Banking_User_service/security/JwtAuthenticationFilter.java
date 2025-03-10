package com.emtech.Digital_Banking_User_service.security;

import com.emtech.Digital_Banking_User_service.service.JwtService;
import com.emtech.Digital_Banking_User_service.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.logging.Logger;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    private static final Logger LOGGER = Logger.getLogger(JwtAuthenticationFilter.class.getName());

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String authHeader = request.getHeader("Authorization");
            String jwt = null;
            String username = null;

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                jwt = authHeader.substring(7);
                username = jwtService.extractUsername(jwt); // Extract username from JWT

                if (username == null) {
                    LOGGER.warning("JWT Token extraction failed or returned null username.");
                }
            }

            // If a username was extracted and no authentication is present in SecurityContext
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // Validate the token before setting authentication
                if (jwtService.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    LOGGER.info("JWT authentication successful for user: " + username);
                } else {
                    LOGGER.warning("Invalid JWT token for user: " + username);
                }
            }
        } catch (Exception e) {
            LOGGER.severe("Could not authenticate user due to exception: " + e.getMessage());
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }
}

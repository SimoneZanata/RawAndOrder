package com.thenetvalue.usersManagement.exception;

import io.micrometer.common.lang.NonNullApi;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@NonNullApi
public class FilterChainExceptionHandler extends OncePerRequestFilter {

@Override
    protected void doFilterInternal( HttpServletRequest request, HttpServletResponse response,
                                 FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            handleFilterException(response, e);
        }
    }

    private void handleFilterException(HttpServletResponse response, Exception e) throws IOException {
        String errorMessage = e.getMessage();
        int statusCode = switch (e.getClass().getSimpleName()) {
            case "AuthenticationCredentialsNotFoundException" -> HttpServletResponse.SC_UNAUTHORIZED;
            case "ServletException" -> HttpServletResponse.SC_BAD_REQUEST;
            default -> HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
        };
        response.getWriter().write(errorMessage);
        response.setStatus(statusCode);
    }


}


package com.thenetvalue.usersManagement.security.filters;
import io.micrometer.common.lang.NonNullApi;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import static com.thenetvalue.usersManagement.security.constants.ExceptionMessagesConstants.ERROR_BAD_CREDENTIALS;

@NonNullApi
public class CheckStatusAuthFilter extends OncePerRequestFilter {
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws IOException, ServletException {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || !authentication.isAuthenticated()) {
                throw new AuthenticationCredentialsNotFoundException(ERROR_BAD_CREDENTIALS);
            } else {
                // Se l'autenticazione ha successo, passa alla catena successiva
                filterChain.doFilter(request, response);
            }
    }

    @Override protected boolean shouldNotFilter(HttpServletRequest request) {
        return !request.getServletPath().equals("/login");}
}
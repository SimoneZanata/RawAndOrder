package com.thenetvalue.usersManagement.security.filters;

import io.micrometer.common.lang.NonNullApi;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
 public class CsrfCookieFilter extends OncePerRequestFilter {

     @Override
     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
             throws ServletException, IOException {

         CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
         if(null!=csrfToken) {
             response.setHeader(csrfToken.getHeaderName(), csrfToken.getToken());
         }
         filterChain.doFilter(request, response);
     }

     @Override
     protected boolean shouldNotFilter(HttpServletRequest request) {
         return request.getServletPath().equals("/users/register");
     }
 }
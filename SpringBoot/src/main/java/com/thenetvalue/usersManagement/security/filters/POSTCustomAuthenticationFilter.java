package com.thenetvalue.usersManagement.security.filters;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.common.lang.NonNullApi;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Base64;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import static com.thenetvalue.usersManagement.security.constants.SecurityConstants.*;
import static org.springframework.security.web.authentication.www.BasicAuthenticationConverter.AUTHENTICATION_SCHEME_BASIC;

@NonNullApi
public class POSTCustomAuthenticationFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest request,  HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String username, password;
        if (request.getMethod().equals("POST") && request.getServletPath().equals("/users/login")) {
            try {
                // Ottieni il corpo della richiesta POST
                BufferedReader reader = request.getReader();
                StringBuilder requestBody = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    requestBody.append(line);
                }
                String postBody = requestBody.toString();
                // Analizza il corpo per ottenere i valori di "username" e "password"
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonNode = objectMapper.readTree(postBody);
                if (jsonNode.has("username") && jsonNode.has("password")) {
                    username = jsonNode.get("username").asText();
                    password = jsonNode.get("password").asText();
                } else {
                    throw new ServletException(ERROR_MISS_CREDENTIALS);
                }/*
                if (!checkPassword(password) || (!checkUsername(username))){
                    throw new ServletException(ERROR_FAULTY_CREDENTIALS);
                }
                  else*/ {
                    // Creare un header "Authorization" con le credenziali in Base64
                    String credentials = username + ":" + password;
                    String base64Credentials = Base64.getEncoder().encodeToString(credentials.getBytes());
                    String authorizationHeader = AUTHENTICATION_SCHEME_BASIC +" "+ base64Credentials;
                    // Creare una nuova richiesta con l'header "Authorization" impostato
                    HttpServletRequestWrapper requestWrapper = new HttpServletRequestWrapper(request) {
                        @Override
                        public String getHeader(String name) {
                            if ("Authorization".equalsIgnoreCase(name)) {
                                return authorizationHeader;
                            }
                            return super.getHeader(name);
                        }
                    };
                    filterChain.doFilter(requestWrapper, response);
               }
            } catch (IOException e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("Error: " + e.getMessage());
            } catch (ServletException e) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("Error: " + e.getMessage());
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }




    /** checkPassword*/
    // ^ -Inizio della stringa.
    // Deve contenere almeno una lettera maiuscola ((?=.*[A-Z])).
    // Deve contenere almeno una lettera minuscola ((?=.*[a-z])).
    // Deve contenere almeno un numero ((?=.*\d)).
    // Non deve contenere spazi bianchi ((?!.*\s)).
    // Non deve contenere caratteri speciali ((?!.*[@#$%^&+=\s])).
    // Deve avere una lunghezza minima di almeno 8 caratteri (.{8,}).
    // $ -Fine della stringa.

    public static boolean checkPassword(String input) {
        Pattern pattern =
                Pattern.compile
                        ("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?!.*[@#$!%^&+=\\s]).{8,}$");
        Matcher matcher = pattern.matcher(input);
        return matcher.find();
    }

    public static boolean checkUsername(String input) {
        Pattern pattern =
                Pattern.compile("^(?!.*[\\s@#$!%^&+=]).*[A-Za-z0-9].*$");
        Matcher matcher = pattern.matcher(input);
        return matcher.find();
    }

}

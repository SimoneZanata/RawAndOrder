package com.thenetvalue.usersManagement.security.filters;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thenetvalue.usersManagement.util.UserUtil;
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
import static com.thenetvalue.usersManagement.security.constants.ExceptionMessagesConstants.ERROR_FAULTY_FIELDS;
import static com.thenetvalue.usersManagement.security.constants.ExceptionMessagesConstants.ERROR_MISS_FIELDS;
import static org.springframework.security.web.authentication.www.BasicAuthenticationConverter.AUTHENTICATION_SCHEME_BASIC;

@NonNullApi
public class LoginFilter extends OncePerRequestFilter {

    private static final String POST_METHOD = "POST";
    private static final String LOGIN_PATH = "/login";

    @Override
    protected void doFilterInternal(HttpServletRequest request,  HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String username, password;
        if (request.getMethod().equals(POST_METHOD) && request.getServletPath().equals(LOGIN_PATH)) {
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
                    throw new ServletException(ERROR_MISS_FIELDS);
                }
                if (!UserUtil.isValidPassword(password) ||(!UserUtil.isValidUsername(username))){

                    throw new ServletException(ERROR_FAULTY_FIELDS);
                }
                  else {
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
        } else filterChain.doFilter(request, response);
    }
}

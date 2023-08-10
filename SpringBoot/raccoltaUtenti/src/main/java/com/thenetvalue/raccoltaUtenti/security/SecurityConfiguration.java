package com.thenetvalue.raccoltaUtenti.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Bean
    public UserDetailsManager users(DataSource dataSource) {
        JdbcUserDetailsManager judm = new JdbcUserDetailsManager(dataSource);
        return judm;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults()) //configurazione cors
                .authorizeHttpRequests(
                        auth ->
                                auth.requestMatchers(HttpMethod.POST, "/users/register")
                                .permitAll()
                                .requestMatchers(HttpMethod.POST, "/users/login")
                                .permitAll()
                                .requestMatchers(HttpMethod.GET, "/users/all")
                                .permitAll()
                                .requestMatchers(HttpMethod.POST, "/users/**")
                                .permitAll()
                                .requestMatchers(HttpMethod.PUT, "/users/**")
                                .permitAll()
                                .requestMatchers(HttpMethod.PUT, "/users/")
                                .permitAll()
                                .requestMatchers(HttpMethod.DELETE, "/users/**")
                                .permitAll()
                                .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return this.passwordEncoder;
    }


}

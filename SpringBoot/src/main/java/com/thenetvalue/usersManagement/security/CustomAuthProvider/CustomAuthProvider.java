package com.thenetvalue.usersManagement.security.CustomAuthProvider;
import com.thenetvalue.usersManagement.dao.UserRepositoryDAO;
import com.thenetvalue.usersManagement.model.User;
import com.thenetvalue.usersManagement.model.authority.Authority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.*;

    @Service
    public class CustomAuthProvider implements AuthenticationProvider {
        @Autowired
        private PasswordEncoder passwordEncoder;
        @Autowired
        private UserRepositoryDAO userRepositoryDAO;

        public Authentication authenticate(Authentication authentication) {
            // Estrai nome utente e password dall'oggetto di autenticazione
            String username = authentication.getName();
            String password = authentication.getCredentials().toString();

            // Cerca un utente nel repository tramite il nome utente
            User user = userRepositoryDAO.findByUsername(username);

            // Verifica se l'utente è presente, la password è corretta e ha almeno un'autorità
            if (user != null && passwordEncoder.matches(password, user.getPassword()) &&
                    !getGrantedAuthorities(user.getAuthorities()).isEmpty()) {
                // Se tutte le condizioni sono soddisfatte, crea un oggetto di autenticazione valido
                return new UsernamePasswordAuthenticationToken(username, password, getGrantedAuthorities(user.getAuthorities()));
            } else {
                // Se una qualsiasi delle condizioni non è soddisfatta, restituisci un oggetto di autenticazione vuoto (non autenticato)
                return new UsernamePasswordAuthenticationToken(null, null);
            }
        }

        private List<GrantedAuthority> getGrantedAuthorities(Set<Authority> authorities) {
            List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
            for (Authority authority : authorities) {
                grantedAuthorities.add(new SimpleGrantedAuthority(authority.getAuthority()));
            }
            return grantedAuthorities;
        }

        @Override
        public boolean supports(Class<?> authentication) {
            return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
        }
    }


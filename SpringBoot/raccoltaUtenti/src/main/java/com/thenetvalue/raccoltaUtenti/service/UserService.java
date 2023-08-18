package com.thenetvalue.raccoltaUtenti.service;

import com.thenetvalue.raccoltaUtenti.dao.UserRepositoryDAO;
import com.thenetvalue.raccoltaUtenti.model.request.LoginUser;
import com.thenetvalue.raccoltaUtenti.model.request.RegisterUser;
import com.thenetvalue.raccoltaUtenti.model.response.ResponseUser;
import com.thenetvalue.raccoltaUtenti.model.request.UpdateUser;
import com.thenetvalue.raccoltaUtenti.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    UserRepositoryDAO userDAO;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(@Qualifier("dbUserDAO") UserRepositoryDAO userDAO) {
        this.userDAO = userDAO;
    }

    public ResponseUser logIn(LoginUser loginUser) throws IllegalArgumentException {
        if (loginUser.getUsername() == null || loginUser.getPassword() == null) {
            throw new IllegalArgumentException("Username e password obbligatori per effettuare il login");
        } else {
            User user = userDAO.findByUsername(loginUser.getUsername());
            if (user == null || !passwordEncoder.matches( loginUser.getPassword(), user.getPassword())) {
                throw new IllegalArgumentException("Username o password non corretti");
            }
            return user.elaborateForResponse(); // Restituisce l'oggetto User se il login è avvenuto con successo
        }
    }

    public ResponseUser registerUser(RegisterUser registerUser)throws IllegalArgumentException{

        //Ulteriore controllo dal FE che i campi non siano nulli
        if (registerUser.getUsername() != null && registerUser.getEmail() != null
                && registerUser.getPassword() != null){
            //Controllo per verificare che lo username non sia gia' presente.
            boolean result = userDAO.existsByUsername(registerUser.getUsername());
            if (!result) {
                registerUser.setPassword(passwordEncoder.encode(registerUser.getPassword()));
                //Elaborazione e salvataggio nel DB.
                User user=registerUser.elaborateForDB();
                userDAO.save(user);
                //Elaborazione per la response.
                return user.elaborateForResponse();
            } else {
                throw new IllegalArgumentException("Username gia' presente.");
           }
        }else {
            throw new IllegalArgumentException("Username, password e email obbligatori.");
       }
    }

    public Optional<User> getUser(int id) {
        return userDAO.findById(id);
    }

    public List<ResponseUser> allUsers() {
     return User.ElaborateListForResponse(userDAO.findAll());
    }

    public String deleteUser(int id) {
        User user = userDAO.findById(id).orElse(null);
        if (user != null) {
            userDAO.delete(user);
            return "Utente cancellato correttamente";
        } else {
            return "Utente non trovato!";
        }
    }

    public List<User> searchUserByUsername(String partialUsername) {
        return userDAO.findByUsernameContains(partialUsername);
    }

    public List<User> searchUserByUsernameAndEmail(String partialUsername, String partialMail) {
        return userDAO.findByUsernameContainsAndEmailContains(partialUsername, partialMail);
    }

    public ResponseUser updatePointsUser(int id,int points) {
        User user = userDAO.findById(id).orElse(null);
        if (user != null) {
            user.setPoints(user.getPoints() + points);
            userDAO.save(user);
            return user.elaborateForResponse();
        }
        throw new IllegalArgumentException("Errore nell'aggiornamento del punteggio.");
    }

    public ResponseUser updatePasswordAndEmail(int id, UpdateUser updateUser) {
        User user = userDAO.findById(id).orElse(null);
        if (user != null) {
           user.setPassword(passwordEncoder.encode(updateUser.getPassword()));
           user.setEmail(updateUser.getEmail());
            userDAO.save(user);
            return user.elaborateForResponse();
        } else {
            throw new IllegalArgumentException("Errore nell'aggiornamento del profilo.");
        }
    }



}




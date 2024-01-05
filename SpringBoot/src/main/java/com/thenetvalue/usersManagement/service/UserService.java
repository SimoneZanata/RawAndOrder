package com.thenetvalue.usersManagement.service;

import com.thenetvalue.usersManagement.dao.UserRepositoryDAO;
import com.thenetvalue.usersManagement.model.User;
import com.thenetvalue.usersManagement.model.DTOs.RegisterDTO;
import com.thenetvalue.usersManagement.model.DTOs.UpdateDTO;
import com.thenetvalue.usersManagement.model.DTOs.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
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
    public UserDTO logIn(Authentication authentication){
            String username = authentication.getName();
            User user = userDAO.findByUsername(username);
            return user.elaborateForResponse();
        }

    public void registerUser(RegisterDTO registerDTO)throws IllegalArgumentException{
        //Ulteriore controllo dal FE che i campi non siano nulli
        if (registerDTO.getUsername() != null && registerDTO.getEmail() != null
                && registerDTO.getPassword() != null){
            //Controllo per verificare che lo username non sia gia' presente.
            boolean result = userDAO.existsByUsername(registerDTO.getUsername());
            if (!result) {
                registerDTO.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
                //Elaborazione e salvataggio nel DB.
                User user= registerDTO.elaborateForDB();
                userDAO.save(user);
            } else {
                throw new IllegalArgumentException("Username already exist");
           }
        }else {
            throw new NullPointerException ("username, password and email are required");
       }
    }

    public Optional<User> getUser(int id) {return userDAO.findById(id);}

    public List<UserDTO> allUsers() {
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

    public UserDTO updatePointsUser(int id, UserDTO userDTO) throws DataAccessException {

        User user = userDAO.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setPoints(user.getPoints() + userDTO.getPoints());
        user.setUsername(userDTO.getUsername());
        user.setId(userDTO.getId());
        userDAO.save(user);
       return user.elaborateForResponse();

    }

    public UserDTO updatePasswordAndEmail(int id, UpdateDTO updateDTO) {
        User user = userDAO.findById(id).orElse(null);
        if (user != null) {
           user.setPassword(passwordEncoder.encode(updateDTO.getPassword()));
           user.setEmail(updateDTO.getEmail());
            userDAO.save(user);
            return user.elaborateForResponse();
        } else {
            throw new IllegalArgumentException("Errore nell'aggiornamento del profilo.");
        }
    }



}




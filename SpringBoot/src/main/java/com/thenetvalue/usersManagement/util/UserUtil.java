package com.thenetvalue.usersManagement.util;

import com.thenetvalue.usersManagement.model.DTOs.RegisterDTO;
import com.thenetvalue.usersManagement.model.DTOs.UserDTO;
import com.thenetvalue.usersManagement.model.Player;
import com.thenetvalue.usersManagement.model.User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserUtil {
    private static final String USERNAME_PATTERN = "^[a-zA-Z0-9]{4,16}$";
    private static final String PASSWORD_PATTERN = "^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,16}$";
    private static final String EMAIL_PATTERN = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";


    public static boolean isValidUsername(String input) {
        Pattern pattern = Pattern.compile(USERNAME_PATTERN);
        Matcher matcher = pattern.matcher(input);
        return matcher.find();
    }

    public static boolean isValidPassword(String input) {
        Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
        Matcher matcher = pattern.matcher(input);
        return matcher.find();
    }

    public static boolean isValidEmail(String input) {
        Pattern pattern = Pattern.compile(EMAIL_PATTERN);
        Matcher matcher = pattern.matcher(input);
        return matcher.find();
    }

    public static void handleLogOutResponseCookie(HttpServletResponse response, HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("JSESSIONID".equals(cookie.getName()) || "XSRF-TOKEN".equals(cookie.getName())) {
                    cookie.setMaxAge(0);
                    cookie.setValue(null);
                    cookie.setPath("/");
                    response.addCookie(cookie);
                }
            }
        }
    }


    public static UserDTO elaborateForResponse(User user){
        UserDTO userDTO =new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setPoints(user.getPoints());
        return userDTO;
    }

    public static User elaborateForDB(RegisterDTO registerUser){
        User user=new User();
        user.setPassword(registerUser.getPassword());
        user.setUsername(registerUser.getUsername());
        user.setEmail(registerUser.getEmail());
        user.setEnabled(true);
        user.setAuthoritiesUser();
        return user;
    }

    public static List<Player> ElaboratePlayersForResponse(Iterable <User> users) {
        List<Player> players = new ArrayList<>();
        for (User user : users) {
            Player player = new Player();
            player.setUsername(user.getUsername());
            player.setPoints(user.getPoints());
            players.add(player);
        }
        return players;
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



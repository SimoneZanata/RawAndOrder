package com.thenetvalue.usersManagement.exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler{

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleControllerException(Exception e) {
        HttpStatus statusCode = switch (e.getClass().getSimpleName()) {
            case "NoSuchElementException","NullPointerException" -> HttpStatus.NOT_FOUND;
            case "IllegalArgumentException" -> HttpStatus.BAD_REQUEST;
            case "UnauthorizedException" -> HttpStatus.UNAUTHORIZED;
            case "DuplicateKeyException" -> HttpStatus.CONFLICT;
            default -> HttpStatus.INTERNAL_SERVER_ERROR;
        };
        return new ResponseEntity<>(e.getMessage(), statusCode);
    }
}

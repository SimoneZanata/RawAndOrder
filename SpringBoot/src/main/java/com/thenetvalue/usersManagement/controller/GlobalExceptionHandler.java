package com.thenetvalue.usersManagement.controller;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        HttpStatus httpStatus = determineHttpStatus(e);
        return new ResponseEntity<>(e.getMessage(), httpStatus);
    }
    private HttpStatus determineHttpStatus(Exception e) {
        return switch (getClassSimpleName(e)) {
            case "NoSuchElementException" -> HttpStatus.NOT_FOUND;
            case "IllegalArgumentException" -> HttpStatus.BAD_REQUEST;
            case "UnauthorizedException" -> HttpStatus.UNAUTHORIZED;
            case "DuplicateKeyException" -> HttpStatus.CONFLICT;
            default -> HttpStatus.INTERNAL_SERVER_ERROR;
        };
    }
    private String getClassSimpleName(Exception e) {
        return e.getClass().getSimpleName();
    }
}

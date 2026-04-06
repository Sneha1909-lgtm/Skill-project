package com.apexglobal.erp.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleBadCredentials(BadCredentialsException e) {
        return ResponseEntity.status(401).body(Map.of("message", "Incorrect Access Key or Portal ID. Contact institutional admin node."));
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> handleUserNotFound(UsernameNotFoundException e) {
        return ResponseEntity.status(401).body(Map.of("message", "Institutional Node ID not found in Nexus database."));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAll(Exception e) {
        // Log the actual exception in the console
        System.err.println("Nexus Critical Exception: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.status(500).body(Map.of(
            "message", "An internal system node failure has occurred.",
            "details", e.getMessage() != null ? e.getMessage() : "Unknown error"
        ));
    }
}

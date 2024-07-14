package com.example.restapi.exceptions;

public class FoundMoreThanOneUserException extends Exception{
    public FoundMoreThanOneUserException(String message) {
        super(message);
    }
}

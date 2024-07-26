package com.example.restapi.exceptions;

public class InvalidRoleTypeException extends Exception{
    public InvalidRoleTypeException(String message) {
        super(message);
    }
}

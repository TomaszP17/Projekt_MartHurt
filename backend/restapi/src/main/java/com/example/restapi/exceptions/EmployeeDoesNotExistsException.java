package com.example.restapi.exceptions;

public class EmployeeDoesNotExistsException extends Exception{
    public EmployeeDoesNotExistsException(String message) {
        super(message);
    }
}

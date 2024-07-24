package com.example.restapi.exceptions;

public class ProductDoesNotExistsException extends Exception{
    public ProductDoesNotExistsException(String message) {
        super(message);
    }
}

package com.example.restapi.exceptions;

public class ShoppingCartDoesNotExistsException extends Exception {
    public ShoppingCartDoesNotExistsException(String message) {
        super(message);
    }
}

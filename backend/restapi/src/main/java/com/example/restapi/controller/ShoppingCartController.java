package com.example.restapi.controller;

import com.example.restapi.dto.response.shoppingcart.ShoppingCartDTO;
import com.example.restapi.exceptions.ShoppingCartDoesNotExistsException;
import com.example.restapi.service.shoppingcart.ShoppingCartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shopping-cart")
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    /**
     * Get all shopping carts and all info about them
     * @return list of shopping carts
     */
    @GetMapping
    public ResponseEntity<List<ShoppingCartDTO>> getShoppingCart(){
        return ResponseEntity.ok(shoppingCartService.getShoppingCart());
    }

    /**
     * Get shopping cart by id
     * @param shoppingCartId identifier of the shopping cart
     * @return shopping cart
     */
    @GetMapping("/{shoppingCartId}")
    public ResponseEntity<?> getShoppingCartById(@PathVariable int shoppingCartId){
        try {
            return ResponseEntity.ok(shoppingCartService.getShoppingCartById(shoppingCartId));
        } catch (ShoppingCartDoesNotExistsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /**
     * Get all products from shopping cart
     * @param shoppingCartId shopping cart identifier
     * @return shopping cart with products
     */
    @GetMapping("/{shoppingCartId}/products")
    public ResponseEntity<?> getProductsInShoppingCart(@PathVariable int shoppingCartId){
        try {
            return ResponseEntity.ok(shoppingCartService.getProductsInShoppingCart(shoppingCartId));
        } catch (ShoppingCartDoesNotExistsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    /**
     * Remove a product from the shopping cart
     * @param shoppingCartId identifier of the shopping cart
     * @param productId identifier of the product
     * @return response entity with status
     */
    @DeleteMapping("/{shoppingCartId}/products/{productId}")
    public ResponseEntity<?> removeProductFromShoppingCart(@PathVariable int shoppingCartId, @PathVariable String productId){
        try {
            shoppingCartService.removeProductFromShoppingCart(shoppingCartId, productId);
            return ResponseEntity.noContent().build();
        } catch (ShoppingCartDoesNotExistsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}

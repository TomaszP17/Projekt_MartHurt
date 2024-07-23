package com.example.restapi.controller;

import com.example.restapi.dto.response.shoppingcart.ShoppingCartDTO;
import com.example.restapi.dto.response.shoppingcart.ShoppingCartProductDTO;
import com.example.restapi.service.shoppingcart.ShoppingCartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    @GetMapping()
    public ResponseEntity<List<ShoppingCartDTO>> getShoppingCart(){
        return ResponseEntity.ok(shoppingCartService.getShoppingCart());
    }

    /**
     * Get shopping cart
     * @param shoppingCartId
     * @return
     */
    @GetMapping("/{shoppingCartId}")
    public ResponseEntity<ShoppingCartDTO> getShoppingCartById(@PathVariable int shoppingCartId){
        return ResponseEntity.ok(shoppingCartService.getShoppingCartById(shoppingCartId));
    }

    /**
     * Get all products from shopping cart
     * @param shoppingCartId shopping cart identifier
     * @return list of products dto
     */
    @GetMapping("/{shoppingCartId}/products")
    public ResponseEntity<List<ShoppingCartProductDTO>> getProductsInShoppingCart(@PathVariable int shoppingCartId){
        return ResponseEntity.ok(shoppingCartService.getProductsInShoppingCart(shoppingCartId));
    }
}

package com.example.restapi.service.shoppingcart;

import com.example.restapi.dto.response.shoppingcart.ShoppingCartDTO;
import com.example.restapi.dto.response.shoppingcart.ShoppingCartProductDTO;
import com.example.restapi.exceptions.ShoppingCartDoesNotExistsException;

import java.util.List;
import java.util.Optional;

public interface ShoppingCartService {
    /**
     * Get all shopping carts
     * @return list of shopping carts
     */
    List<ShoppingCartDTO> getShoppingCart();

    /**
     * Get shopping cart by id
     * @param shoppingCartId identifier shopping cart
     * @return user shopping cart
     */
    ShoppingCartDTO getShoppingCartById(int shoppingCartId) throws ShoppingCartDoesNotExistsException;

    /**
     * Get products in shopping cart by shopping cart id
     * @param shoppingCartId identifier shopping cart
     * @return shopping cart with products
     */
    ShoppingCartProductDTO getProductsInShoppingCart(int shoppingCartId) throws ShoppingCartDoesNotExistsException;

    /**
     * Remove a product from the shopping cart
     * @param shoppingCartId identifier shopping cart
     * @param productId identifier product
     */
    void removeProductFromShoppingCart(int shoppingCartId, String productId) throws ShoppingCartDoesNotExistsException;
}

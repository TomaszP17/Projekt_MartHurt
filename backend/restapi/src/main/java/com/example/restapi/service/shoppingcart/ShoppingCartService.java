package com.example.restapi.service.shoppingcart;

import com.example.restapi.dto.response.shoppingcart.ShoppingCartDTO;
import com.example.restapi.dto.response.shoppingcart.ShoppingCartProductDTO;

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
    ShoppingCartDTO getShoppingCartById(int shoppingCartId);

    List<ShoppingCartProductDTO> getProductsInShoppingCart(int shoppingCardId);

    //void createShoppingCart();

}

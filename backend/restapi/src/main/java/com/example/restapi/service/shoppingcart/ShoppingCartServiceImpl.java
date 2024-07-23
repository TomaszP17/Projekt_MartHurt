package com.example.restapi.service.shoppingcart;

import com.example.restapi.dto.response.shoppingcart.ShoppingCartDTO;
import com.example.restapi.dto.response.shoppingcart.ShoppingCartProductDTO;
import com.example.restapi.entity.products.ShoppingCart;
import com.example.restapi.repository.ShoppingCartReposiotory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService{

    private final ShoppingCartReposiotory shoppingCartReposiotory;

    public ShoppingCartServiceImpl(ShoppingCartReposiotory shoppingCartReposiotory) {
        this.shoppingCartReposiotory = shoppingCartReposiotory;
    }

    @Override
    public List<ShoppingCartDTO> getShoppingCart() {
        return shoppingCartReposiotory.findAll().stream().map(this::convertIntoDTO).toList();
    }

    @Override
    public ShoppingCartDTO getShoppingCartById(int shoppingCart) {
        return null;
    }

    @Override
    public List<ShoppingCartProductDTO> getProductsInShoppingCart(int shoppingCardId) {
        /*return shoppingCartReposiotory
                .findById(shoppingCardId).stream().map().toList();*/
        return null;
    }

    private ShoppingCartDTO convertIntoDTO(ShoppingCart shoppingCart){
        return new ShoppingCartDTO(
                shoppingCart.getId(),
                shoppingCart.getCreateDate(),
                shoppingCart.getEmployee().getMyuserId()
        );
    }

    private ShoppingCartProductDTO convertIntoProductDTO(ShoppingCart shoppingCart){
        return null;
    }

}

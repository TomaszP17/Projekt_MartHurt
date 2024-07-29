package com.example.restapi.service.shoppingcart;

import com.example.restapi.dto.response.shoppingcart.ProductDTO;
import com.example.restapi.dto.response.shoppingcart.ShoppingCartDTO;
import com.example.restapi.dto.response.shoppingcart.ShoppingCartProductDTO;
import com.example.restapi.entity.products.Product;
import com.example.restapi.entity.products.ProductShoppingCart;
import com.example.restapi.entity.products.ShoppingCart;
import com.example.restapi.exceptions.ShoppingCartDoesNotExistsException;
import com.example.restapi.repository.ShoppingCartReposiotory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ShoppingCartReposiotory shoppingCartReposiotory;

    public ShoppingCartServiceImpl(ShoppingCartReposiotory shoppingCartReposiotory) {
        this.shoppingCartReposiotory = shoppingCartReposiotory;
    }

    @Override
    public List<ShoppingCartDTO> getShoppingCart() {
        return shoppingCartReposiotory.findAll().stream().map(this::convertIntoDTO).toList();
    }

    @Override
    public ShoppingCartDTO getShoppingCartById(int shoppingCartId) throws ShoppingCartDoesNotExistsException {
        return shoppingCartReposiotory
                .findById(shoppingCartId)
                .map(this::convertIntoDTO)
                .orElseThrow(() -> new ShoppingCartDoesNotExistsException("Shopping cart with that id: " + shoppingCartId + " does not exist"));
    }

    @Override
    public ShoppingCartProductDTO getProductsInShoppingCart(int shoppingCartId) throws ShoppingCartDoesNotExistsException {
        ShoppingCart shoppingCart = shoppingCartReposiotory.findShoppingCartWithProducts(shoppingCartId);
        if (shoppingCart == null) {
            throw new ShoppingCartDoesNotExistsException("Shopping cart with id: " + shoppingCartId + " does not exist");
        }
        return convertIntoProductDTO(shoppingCart);
    }

    @Override
    public void removeProductFromShoppingCart(int shoppingCartId, String productId) throws ShoppingCartDoesNotExistsException {
        ShoppingCart shoppingCart = shoppingCartReposiotory.findById(shoppingCartId)
                .orElseThrow(() -> new ShoppingCartDoesNotExistsException("Shopping cart with id: " + shoppingCartId + " does not exist"));

        ProductShoppingCart productShoppingCart = shoppingCart.getProductShoppingCarts().stream()
                .filter(psc -> psc.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new ShoppingCartDoesNotExistsException("Product with id: " + productId + " does not exist in shopping cart"));

        shoppingCart.getProductShoppingCarts().remove(productShoppingCart);
        shoppingCartReposiotory.save(shoppingCart);
    }

    private ShoppingCartDTO convertIntoDTO(ShoppingCart shoppingCart) {
        return new ShoppingCartDTO(
                shoppingCart.getId(),
                shoppingCart.getCreateDate(),
                shoppingCart.getEmployee().getMyuserId()
        );
    }

    private ShoppingCartProductDTO convertIntoProductDTO(ShoppingCart shoppingCart) {
        List<ProductDTO> products = shoppingCart.getProductShoppingCarts().stream()
                .map(this::convertIntoProductDTO)
                .collect(Collectors.toList());

        return new ShoppingCartProductDTO(
                shoppingCart.getId(),
                shoppingCart.getCreateDate(),
                shoppingCart.getEmployee().getMyuserId(),
                products
        );
    }

    private ProductDTO convertIntoProductDTO(ProductShoppingCart productShoppingCart) {
        Product product = productShoppingCart.getProduct();
        String imageUrl = product.getImages().isEmpty() ? null : product.getImages().iterator().next().getUrl();

        return new ProductDTO(
                product.getId(),
                product.getProductOriginalName(),
                product.getBruttoClientBuyPrice(),
                productShoppingCart.getQuantity(),
                imageUrl,
                product.getAvailability()
        );
    }
}

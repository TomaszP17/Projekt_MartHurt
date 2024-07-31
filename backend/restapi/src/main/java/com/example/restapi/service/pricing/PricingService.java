package com.example.restapi.service.pricing;

import com.example.restapi.dto.response.lighting.LightingFromShoppingCartResponseDTO;

import java.util.List;

public interface PricingService {

    List<LightingFromShoppingCartResponseDTO> getProductsFromShoppingCart(int shoppingCartId, double quantity);

}

package com.example.restapi.service.lighting;

import com.example.restapi.dto.response.lighting.LightingFromShoppingCartResponseDTO;
import com.example.restapi.dto.response.lighting.LightingFullResponseDTO;
import com.example.restapi.dto.response.lighting.LightingNamesResponseDTO;
import com.example.restapi.dto.response.lighting.LightingResponseDTO;
import com.example.restapi.exceptions.LightingNotFoundException;

import java.math.BigDecimal;
import java.util.List;

public interface LightingService {
    List<LightingResponseDTO> getAllLighting();
    List<LightingResponseDTO> getFilteredLighting(BigDecimal priceFrom, BigDecimal priceTo, List<String> supplierNames);
    //List<LightingResponseDTO> getSortedLighting(String sortBy);

    LightingFullResponseDTO getLighting(String lightingId) throws LightingNotFoundException;
    List<LightingResponseDTO> searchLighting(String searchLightingName);
    List<LightingNamesResponseDTO> getNewsLighting();

    List<LightingFromShoppingCartResponseDTO> getLightingsFromShoppingCart(List<String> productsId);

    List<LightingResponseDTO> getLastProducts();
}

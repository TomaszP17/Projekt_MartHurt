package com.example.restapi.service.lighting;

import com.example.restapi.dto.response.LightingResponseDTO;

import java.math.BigDecimal;
import java.util.List;

public interface LightingService {
    List<LightingResponseDTO> getAllLighting();
    List<LightingResponseDTO> getFilteredLighting(BigDecimal priceFrom, BigDecimal priceTo, String supplierName);
}

package com.example.restapi.service.lighting;

import com.example.restapi.controller.LightingController;
import com.example.restapi.dto.response.LightingResponseDTO;
import com.example.restapi.entity.products.Image;
import com.example.restapi.entity.products.Lighting;
import com.example.restapi.repository.LightingRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class LightingServiceImpl implements LightingService{

    private final LightingRepository lightingRepository;

    public LightingServiceImpl(LightingRepository lightingRepository) {
        this.lightingRepository = lightingRepository;
    }

    @Override
    public List<LightingResponseDTO> getAllLighting() {
        return lightingRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public List<LightingResponseDTO> getFilteredLighting(BigDecimal priceFrom, BigDecimal priceTo, String supplierName) {
        return lightingRepository
                .findAll()
                .stream()
                .filter(lighting -> lighting.getProduct().getBruttoClientBuyPrice().compareTo(priceFrom) >= 0 &&
                        lighting.getProduct().getBruttoClientBuyPrice().compareTo(priceTo) <= 0 &&
                        (supplierName == null || lighting.getProduct().getSupplier().getName().equals(supplierName)))
                .map(this::convertToDTO)
                .toList();
    }

    private LightingResponseDTO convertToDTO(Lighting lighting) {
        return new LightingResponseDTO(
                lighting.getProduct().getImages().stream().map(Image::getUrl).toList(),
                lighting.getProduct().getProductName(),
                lighting.getProduct().getId(),
                lighting.getProduct().getSupplier().getName()
        );
    }

}

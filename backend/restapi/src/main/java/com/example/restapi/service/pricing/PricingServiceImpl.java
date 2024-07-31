package com.example.restapi.service.pricing;

import com.example.restapi.dto.response.lighting.LightingFromShoppingCartResponseDTO;
import com.example.restapi.repository.PricingRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PricingServiceImpl implements PricingService{

    private final PricingRepository pricingRepository;

    public PricingServiceImpl(PricingRepository pricingRepository) {
        this.pricingRepository = pricingRepository;
    }

    @Override
    public List<LightingFromShoppingCartResponseDTO> getProductsFromShoppingCart(int shoppingCartId, double quantity) {
        List<LightingFromShoppingCartResponseDTO> lightings = pricingRepository.findLightingsByShoppingCartId(shoppingCartId);

        return lightings.stream()
                .map(lighting -> new LightingFromShoppingCartResponseDTO(
                        lighting.name(),
                        lighting.imageUrl(),
                        lighting.description(),
                        lighting.nettoClientBuyPrice(),
                        lighting.bruttoClientBuyPrice(),
                        quantity,
                        lighting.nettoClientBuyPrice().multiply(BigDecimal.valueOf(quantity)).doubleValue()))
                .toList();
    }
}

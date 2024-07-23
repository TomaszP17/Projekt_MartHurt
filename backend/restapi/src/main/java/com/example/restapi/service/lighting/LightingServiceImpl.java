package com.example.restapi.service.lighting;

import com.example.restapi.dto.response.LightingFullResponseDTO;
import com.example.restapi.dto.response.LightingNamesResponseDTO;
import com.example.restapi.dto.response.LightingResponseDTO;
import com.example.restapi.entity.products.Image;
import com.example.restapi.entity.products.Lighting;
import com.example.restapi.exceptions.LightingNotFoundException;
import com.example.restapi.repository.LightingRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<LightingResponseDTO> getFilteredLighting(BigDecimal priceFrom,
                                                         BigDecimal priceTo,
                                                         List<String> supplierNames) {

        return lightingRepository
                .findAll()
                .stream()
                .filter(lighting ->
                        (priceFrom == null || lighting.getProduct().getBruttoClientBuyPrice().compareTo(priceFrom) >= 0) &&
                                (priceTo == null || lighting.getProduct().getBruttoClientBuyPrice().compareTo(priceTo) <= 0) &&
                        (supplierNames == null
                                || supplierNames.isEmpty()
                                || supplierNames.contains(lighting.getProduct().getSupplier().getName())))
                .map(this::convertToDTO)
                .toList();
    }

    public LightingFullResponseDTO getLighting(String lightingId) throws LightingNotFoundException {

        Lighting lighting = lightingRepository.findById(lightingId)
                .orElseThrow(() -> new LightingNotFoundException("Lighting not found"));
        return new LightingFullResponseDTO(
                lighting.getProductId(),
                lighting.getProduct().getProductMarkings().getName(),
                lighting.getProduct().getSupplier().getName(),
                lighting.getProduct().getProductOriginalName(),
                lighting.getProduct().getNettoClientBuyPrice(),
                lighting.getProduct().getBruttoClientBuyPrice(),
                lighting.getProduct().getDescription(),
                lighting.getProduct().getAvailability(),
                lighting.getProduct().getProductShops().stream().map(productShop -> productShop.getShop().getName()).collect(Collectors.toSet()),
                lighting.getProduct().getImages().stream().map(Image::getUrl).collect(Collectors.toSet())
        );
    }

    /**
     * Get lighting with productName or productId which starts with param
     * @param searchLightingName searching phrase
     * @return list of found lighting record
     */
    @Override
    public List<LightingResponseDTO> searchLighting(String searchLightingName) {
        return lightingRepository
                .findAll()
                .stream()
                .filter(lighting -> lighting.getProductName().startsWith(searchLightingName)
                || lighting.getProductId().startsWith(searchLightingName))
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public List<LightingNamesResponseDTO> getNewsLighting() {

        PageRequest pageRequest = PageRequest.of(0, 10);

        return lightingRepository
                .findTopByOrderByProductDateAddedDesc(pageRequest)
                .stream()
                .map(this::convertToShortDTO)
                .toList();
    }

    private LightingResponseDTO convertToDTO(Lighting lighting) {
        return new LightingResponseDTO(
                lighting.getProduct().getImages().stream().map(Image::getUrl).toList(),
                lighting.getProduct().getProductOriginalName(),
                lighting.getProductId(),
                lighting.getProductName(),
                lighting.getProduct().getBruttoClientBuyPrice(),
                lighting.getProduct().getDateAdded()
        );
    }

    private LightingNamesResponseDTO convertToShortDTO(Lighting lighting){
        return new LightingNamesResponseDTO(
                lighting.getProduct()
                        .getImages()
                        .stream()
                        .map(Image::getUrl)
                        .findFirst()
                        .orElse(null),
                lighting.getProductName()
        );
    }
}

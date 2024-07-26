package com.example.restapi.controller;

import com.example.restapi.dto.response.lighting.LightingFromShoppingCartResponseDTO;
import com.example.restapi.dto.response.lighting.LightingFullResponseDTO;
import com.example.restapi.dto.response.lighting.LightingNamesResponseDTO;
import com.example.restapi.dto.response.lighting.LightingResponseDTO;
import com.example.restapi.exceptions.LightingNotFoundException;
import com.example.restapi.helpers.ComparatorHelpers;
import com.example.restapi.service.lighting.LightingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/lightings")
public class LightingController {

    private final LightingService lightingService;

    public LightingController(LightingService lightingService) {
        this.lightingService = lightingService;
    }

    @GetMapping
    public ResponseEntity<List<LightingResponseDTO>> getLightings(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortOrder,
            @RequestParam(required = false) String lightingSearch,
            @RequestParam(required = false) BigDecimal priceFrom,
            @RequestParam(required = false) BigDecimal priceTo,
            @RequestParam(required = false) List<String> supplierNames
    ) {
        List<LightingResponseDTO> result;

        if(lightingSearch != null && !lightingSearch.isEmpty()){
            result = lightingService.searchLighting(lightingSearch);
        }else{
            if (priceFrom != null || priceTo != null || supplierNames != null) {
                result = lightingService.getFilteredLighting(priceFrom, priceTo, supplierNames);
            } else {
                result = lightingService.getAllLighting();
            }

            if (sortBy != null && !sortBy.isEmpty()) {
                Comparator<LightingResponseDTO> comparator = ComparatorHelpers.getComparator(sortBy, sortOrder);
                result = result
                        .stream()
                        .sorted(comparator)
                        .toList();
            }
        }
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping("{lightingId}")
    public ResponseEntity<LightingFullResponseDTO> getLighting(@PathVariable String lightingId){
        try {
            return ResponseEntity.ok(lightingService.getLighting(lightingId));
        } catch (LightingNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/pdf-lighting")
    public ResponseEntity<List<LightingFromShoppingCartResponseDTO>> getLightingsFromCart(
            @RequestParam("productsId") List<String> productsId
    ) {
        return ResponseEntity.ok(lightingService.getLightingsFromShoppingCart(productsId));
    }

    @GetMapping("/news")
    public ResponseEntity<List<LightingNamesResponseDTO>> getNewsLighting(){
        return ResponseEntity.ok(lightingService.getNewsLighting());
    }
}

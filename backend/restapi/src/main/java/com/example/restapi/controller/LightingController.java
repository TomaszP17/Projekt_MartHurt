package com.example.restapi.controller;

import com.example.restapi.dto.response.LightingFullResponseDTO;
import com.example.restapi.dto.response.LightingResponseDTO;
import com.example.restapi.entity.products.Lighting;
import com.example.restapi.exceptions.LightingNotFoundException;
import com.example.restapi.helpers.ComparatorHelpers;
import com.example.restapi.service.lighting.LightingService;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
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

        return ResponseEntity.ok(result);
    }

    @GetMapping("{lightingId}")
    public ResponseEntity<LightingFullResponseDTO> getLighting(@PathVariable String lightingId){
        try {
            return ResponseEntity.ok(lightingService.getLighting(lightingId));
        } catch (LightingNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}

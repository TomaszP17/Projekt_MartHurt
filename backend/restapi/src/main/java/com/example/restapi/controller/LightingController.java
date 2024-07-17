package com.example.restapi.controller;

import com.example.restapi.dto.response.LightingFullResponseDTO;
import com.example.restapi.dto.response.LightingResponseDTO;
import com.example.restapi.exceptions.LightingNotFoundException;
import com.example.restapi.service.lighting.LightingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
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
            @RequestParam(required = false) BigDecimal priceFrom,
            @RequestParam(required = false) BigDecimal priceTo,
            @RequestParam(required = false) List<String> supplierNames
    ) {
        if (priceFrom != null || priceTo != null || supplierNames != null) {
            List<LightingResponseDTO> result = lightingService.getFilteredLighting(priceFrom, priceTo, supplierNames);

            if (result.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(result);
            }
        }

        return ResponseEntity.ok(lightingService.getAllLighting());
    }
    //todo
    @GetMapping("/sort")
    public ResponseEntity<List<LightingResponseDTO>> getSortedLighting(
            @RequestParam(defaultValue = "product_name") String sortBy){
        return ResponseEntity.ok(lightingService.getSortedLighting(sortBy));
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

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
    public ResponseEntity<List<LightingResponseDTO>> getAllLighting() {
        return ResponseEntity.ok(lightingService.getAllLighting());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<LightingResponseDTO>> getFilteredLighting(
            @RequestParam BigDecimal priceFrom,
            @RequestParam BigDecimal priceTo,
            @RequestParam String supplierName
    ){
        return ResponseEntity.ok(lightingService.getFilteredLighting(priceFrom, priceTo, supplierName));
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

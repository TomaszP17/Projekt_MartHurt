package com.example.restapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lightings")
public class LightingController {

    @GetMapping()
    public ResponseEntity<?> getAllLightings(){
        return null;
    }


}

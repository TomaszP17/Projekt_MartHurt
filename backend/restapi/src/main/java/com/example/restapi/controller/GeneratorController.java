package com.example.restapi.controller;

import com.example.restapi.dto.request.PdfRequest;
import com.example.restapi.helpers.IPDFGenerator;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api-pdf")
public class GeneratorController {

    private final IPDFGenerator generator;

    public GeneratorController(IPDFGenerator generator) {
        this.generator = generator;
    }

    @PostMapping("/generate")
    public ResponseEntity<InputStreamResource> generatePdf(@RequestBody PdfRequest request){
        ByteArrayInputStream byteArrayInputStream;
        try {
            byteArrayInputStream = generator.generate(request.getText());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=generated.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(byteArrayInputStream));
    }

}

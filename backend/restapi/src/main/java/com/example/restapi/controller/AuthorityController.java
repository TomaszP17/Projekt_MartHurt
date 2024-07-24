package com.example.restapi.controller;

import com.example.restapi.dto.request.AuthorityRequestDTO;
import com.example.restapi.dto.response.authority.AuthorityResponseDTO;
import com.example.restapi.exceptions.AuthorityNotFoundException;
import com.example.restapi.service.authority.AuthorityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/authorities")
public class AuthorityController {

    private final AuthorityService authorityService;

    public AuthorityController(AuthorityService authorityService) {
        this.authorityService = authorityService;
    }

    @GetMapping
    public ResponseEntity<?> getAuthorities(){
        List<AuthorityResponseDTO> authorities = authorityService.getAuthorities();

        if(authorities.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No authorities found in the database.");
        }else{
            return ResponseEntity.ok(authorities);
        }
    }

    @GetMapping("/{authorityId}")
    public ResponseEntity<?> getAuthority(@PathVariable int authorityId){
        try{
            return ResponseEntity.ok(authorityService.getAuthorityById(authorityId));
        }catch (AuthorityNotFoundException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        
    }

//    @PostMapping
//    public ResponseEntity<?> addAuthority(@RequestBody AuthorityRequestDTO requestDTO){
//        try{
//            return ResponseEntity.status(HttpStatus.CREATED).body(authorityService.addAuthority(requestDTO));
//        }catch (IllegalArgumentException e){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
//    }

    @PutMapping("/{authorityId}")
    public ResponseEntity<?> updateAuthority(@PathVariable int authorityId,
                                                                @RequestBody AuthorityRequestDTO requestDTO){
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(authorityService.updateAuthority(authorityId, requestDTO));
        } catch (AuthorityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{authorityId}")
    public ResponseEntity<Void> deleteAuthority(@PathVariable int authorityId) {
        try {
            authorityService.deleteAuthority(authorityId);
            return ResponseEntity.noContent().build();
        } catch (AuthorityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

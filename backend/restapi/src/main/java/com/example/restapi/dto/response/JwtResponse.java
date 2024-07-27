package com.example.restapi.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private int id;
    private String username;
    private List<String> roles;

}

package com.example.restapi.dto.response.authority;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class AuthorityResponseDTO {
    private int id;
    private String authorityName;
    private Set<Integer> usersId;


    public AuthorityResponseDTO(int id, String authorityName) {
        this.id = id;
        this.authorityName = authorityName;
        this.usersId = Set.of();
    }


    public AuthorityResponseDTO(int id, String authorityName, Set<Integer> usersId) {
        this.id = id;
        this.authorityName = authorityName;
        this.usersId = usersId;
    }
}


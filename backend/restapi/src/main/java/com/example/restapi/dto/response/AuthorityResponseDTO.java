package com.example.restapi.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class AuthorityResponseDTO {
    private int id;
    private String authorityName;
    private Set<Integer> usersId;

    // Konstruktor dla Authority bez użytkowników
    public AuthorityResponseDTO(int id, String authorityName) {
        this.id = id;
        this.authorityName = authorityName;
        this.usersId = Set.of(); // pusty zestaw użytkowników
    }

    // Konstruktor dla Authority z użytkownikami
    public AuthorityResponseDTO(int id, String authorityName, Set<Integer> usersId) {
        this.id = id;
        this.authorityName = authorityName;
        this.usersId = usersId;
    }
}


package com.example.restapi.service;

import com.example.restapi.dto.request.AuthorityRequestDTO;
import com.example.restapi.dto.response.AuthorityResponseDTO;
import com.example.restapi.exceptions.AuthorityNotFoundException;

import java.util.List;

public interface AuthorityService {
    List<AuthorityResponseDTO> getAuthorities();

    AuthorityResponseDTO addAuthority(AuthorityRequestDTO requestDTO);

    AuthorityResponseDTO getAuthorityById(int authorityId) throws AuthorityNotFoundException;

    AuthorityResponseDTO updateAuthority(int authorityId);
}

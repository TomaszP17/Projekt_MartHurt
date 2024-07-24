package com.example.restapi.service.authority;

import com.example.restapi.dto.request.AuthorityRequestDTO;
import com.example.restapi.dto.response.authority.AuthorityResponseDTO;
import com.example.restapi.exceptions.AuthorityNotFoundException;

import java.util.List;

public interface AuthorityService {
    List<AuthorityResponseDTO> getAuthorities();

//    AuthorityResponseDTO addAuthority(AuthorityRequestDTO requestDTO);

    AuthorityResponseDTO getAuthorityById(int authorityId) throws AuthorityNotFoundException;

    AuthorityResponseDTO updateAuthority(int authorityId,AuthorityRequestDTO requestDTO) throws AuthorityNotFoundException;

    void deleteAuthority(int authorityId) throws AuthorityNotFoundException;
}

package com.example.restapi.service;

import com.example.restapi.dto.request.AuthorityRequestDTO;
import com.example.restapi.dto.response.AuthorityResponseDTO;
import com.example.restapi.entity.Authority;
import com.example.restapi.exceptions.AuthorityNotFoundException;
import com.example.restapi.repository.AuthorityRepository;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthorityServiceImpl implements AuthorityService{

    private final AuthorityRepository authorityRepository;

    public AuthorityServiceImpl(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    public List<AuthorityResponseDTO> getAuthorities(){
        return authorityRepository
                .findAll()
                .stream()
                .map(e -> new AuthorityResponseDTO(
                        e.getId(),
                        e.getAuthorityName(),
                        e.getUserAuthorities()
                                .stream()
                                .map(myUserAuthority -> myUserAuthority.getUser().getId())
                                .collect(Collectors.toSet())
                )).collect(Collectors.toList());
    }

    @Override
    public AuthorityResponseDTO getAuthorityById(int authorityId) throws AuthorityNotFoundException {
        Authority authority = findAuthorityByIdOrThrow(authorityId);
        return getAuthorityResponseDTO(authority);
    }

    @Override
    public AuthorityResponseDTO addAuthority(AuthorityRequestDTO requestDTO) {

        //need to check if authority with that name exists in db, because we dont want two roles with same name
        Authority existingAuthority = authorityRepository.findByAuthority(requestDTO.getAuthorityName());

        if(existingAuthority != null){
            throw new IllegalArgumentException("Authority with this name already exists");
        }

        Authority authority = new Authority();
        authority.setAuthority(requestDTO.getAuthorityName());

        Authority savedAuthority = authorityRepository.save(authority);

        return getAuthorityResponseDTO(savedAuthority);
    }

    @Override
    public AuthorityResponseDTO updateAuthority(int authorityId,
                                                AuthorityRequestDTO requestDTO) throws AuthorityNotFoundException {

        Authority updatedAuthority = findAuthorityByIdOrThrow(authorityId);

        updatedAuthority.setAuthority(requestDTO.getAuthorityName());
        authorityRepository.save(updatedAuthority);

        return getAuthorityResponseDTO(updatedAuthority);
    }

    @Override
    public void deleteAuthority(int authorityId) throws AuthorityNotFoundException {
        Authority authority = findAuthorityByIdOrThrow(authorityId);
        authorityRepository.delete(authority);
    }

    @NotNull
    private AuthorityResponseDTO getAuthorityResponseDTO(Authority updatedAuthority) {
        if (updatedAuthority.getUserAuthorities() == null || updatedAuthority.getUserAuthorities().isEmpty()) {
            return new AuthorityResponseDTO(
                    updatedAuthority.getId(),
                    updatedAuthority.getAuthorityName()
            );
        } else {
            return new AuthorityResponseDTO(
                    updatedAuthority.getId(),
                    updatedAuthority.getAuthorityName(),
                    updatedAuthority.getUserAuthorities()
                            .stream()
                            .map(myUserAuthority -> myUserAuthority.getUser().getId())
                            .collect(Collectors.toSet())
            );
        }
    }

    private Authority findAuthorityByIdOrThrow(int authorityId) throws AuthorityNotFoundException {
        return authorityRepository
                .findById(authorityId)
                .orElseThrow(
                        () -> new AuthorityNotFoundException("Authority with id: " + authorityId + " does not exists"));
    }
}

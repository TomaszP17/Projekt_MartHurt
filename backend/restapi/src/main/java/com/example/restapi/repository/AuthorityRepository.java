package com.example.restapi.repository;

import com.example.restapi.entity.users.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    Authority findByAuthority(String authorityName);
}

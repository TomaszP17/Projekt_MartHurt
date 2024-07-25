package com.example.restapi.repository;

import com.example.restapi.entity.users.Authority;
import com.example.restapi.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    Authority findByName(RoleType name);
}

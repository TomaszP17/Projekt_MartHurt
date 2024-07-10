package com.example.restapi.repository;

import com.example.restapi.entity.MyUserAuthority;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MyUserAuthorityRepository extends JpaRepository<MyUserAuthority, Integer> {
}

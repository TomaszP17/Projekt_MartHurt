package com.example.restapi.repository;

import com.example.restapi.entity.MyUserAuthority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;


public interface MyUserAuthorityRepository extends JpaRepository<MyUserAuthority, Integer> {

    @Query("SELECT a FROM MyUserAuthority a WHERE a.user.id = :userId")
    Set<MyUserAuthority> findAllByUserId(@Param("userId") int userId);
}

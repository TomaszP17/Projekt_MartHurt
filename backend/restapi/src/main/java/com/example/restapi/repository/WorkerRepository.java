package com.example.restapi.repository;

import com.example.restapi.entity.users.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkerRepository extends JpaRepository<Employee, Integer> {
}

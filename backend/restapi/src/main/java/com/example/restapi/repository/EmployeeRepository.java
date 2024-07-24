package com.example.restapi.repository;

import com.example.restapi.entity.users.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}

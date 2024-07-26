package com.example.restapi.repository;

import com.example.restapi.dto.response.employee.EmployeeResponseDTO;
import com.example.restapi.entity.users.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    @Query("SELECT e FROM Employee e " +
            "JOIN FETCH e.myuser u " +
            "LEFT JOIN FETCH u.userAuthorities ua " +
            "LEFT JOIN FETCH ua.authority a")
    List<Employee> findAllWithRoles();

}

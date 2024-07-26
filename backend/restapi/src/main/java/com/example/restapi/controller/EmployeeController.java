package com.example.restapi.controller;

import com.example.restapi.dto.response.employee.EmployeeResponseDTO;
import com.example.restapi.exceptions.EmployeeDoesNotExistsException;
import com.example.restapi.service.employee.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> getEmployees(){
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<?> getEmployee(@PathVariable int employeeId){
        try {
            return ResponseEntity.ok(employeeService.getEmployeeById(employeeId));
        } catch (EmployeeDoesNotExistsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{employeeId}")
    public ResponseEntity<?> changeEmployeeRole(@PathVariable int employeeId){
        return null;
    }
}

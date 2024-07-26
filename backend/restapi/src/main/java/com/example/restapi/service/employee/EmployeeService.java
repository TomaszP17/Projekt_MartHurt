package com.example.restapi.service.employee;

import com.example.restapi.dto.response.employee.EmployeeResponseDTO;
import com.example.restapi.enums.RoleType;
import com.example.restapi.exceptions.EmployeeDoesNotExistsException;
import com.example.restapi.exceptions.InvalidRoleTypeException;

import java.util.List;

public interface EmployeeService {

    List<EmployeeResponseDTO> getAllEmployees();

    EmployeeResponseDTO getEmployeeById(int employeeId) throws EmployeeDoesNotExistsException;

    EmployeeResponseDTO changeEmployeeRole(int employeeId, RoleType roleType) throws InvalidRoleTypeException, EmployeeDoesNotExistsException;

}

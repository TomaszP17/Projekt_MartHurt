package com.example.restapi.service.employee;

import com.example.restapi.dto.response.employee.EmployeeResponseDTO;
import com.example.restapi.entity.users.Authority;
import com.example.restapi.entity.users.Employee;
import com.example.restapi.entity.users.MyUser;
import com.example.restapi.enums.RoleType;
import com.example.restapi.exceptions.EmployeeDoesNotExistsException;
import com.example.restapi.exceptions.InvalidRoleTypeException;
import com.example.restapi.repository.AuthorityRepository;
import com.example.restapi.repository.EmployeeRepository;
import com.example.restapi.repository.MyUserAuthorityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final AuthorityRepository authorityRepository;
    private final MyUserAuthorityRepository myUserAuthorityRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, AuthorityRepository authorityRepository, MyUserAuthorityRepository myUserAuthorityRepository) {
        this.employeeRepository = employeeRepository;
        this.authorityRepository = authorityRepository;
        this.myUserAuthorityRepository = myUserAuthorityRepository;
    }

    @Override
    public List<EmployeeResponseDTO> getAllEmployees() {
        return employeeRepository.findAllWithRoles().stream().map(this::convertIntoDTO).toList();
    }

    @Override
    public EmployeeResponseDTO getEmployeeById(int employeeId) throws EmployeeDoesNotExistsException {
        return employeeRepository
                .findById(employeeId)
                .map(this::convertIntoDTO)
                .orElseThrow(() -> new EmployeeDoesNotExistsException("Employee with that id: " + employeeId + " does not exists"));
    }

    @Override
    public EmployeeResponseDTO changeEmployeeRole(int employeeId, RoleType roleType) throws InvalidRoleTypeException, EmployeeDoesNotExistsException {

        // check if role type is valid
        if(!isRoleTypeValid(roleType)){
            throw new InvalidRoleTypeException("this role type: " + roleType.name() + " does not exists");
        }

        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow(() -> new EmployeeDoesNotExistsException("Employee with that id: " + employeeId + " does not exists"));

        //change user role
        MyUser user = employee.getMyuser();

        if(userHasRole(user, roleType)){
            throw new InvalidRoleTypeException("this user has already this role type!" + roleType);
        }

        //addRoleToUser(user, roleType);

        //check if new role is >= 'handlowiec'
        if(isRoleHigherOrEqualSalesman(roleType)){

        }else{

        }
        //if true => create new shopping cart for user
        //if false => save new role for user ex. 'magazyn' or 'transport'


        return null;
    }

    private EmployeeResponseDTO convertIntoDTO(Employee employee){
        return new EmployeeResponseDTO(
                employee.getMyuserId(),
                employee.getMyuser().getEmail(),
                employee.getMyuser().getUsername(),
                employee.getMyuser().getUserAuthorities()
                        .stream()
                        .map(myUserAuthority -> myUserAuthority.getAuthority().getName())
                        .toList()
        );
    }

    private boolean isRoleTypeValid(RoleType roleType) {
        for (RoleType rt : RoleType.values()) {
            if (rt == roleType) {
                return true;
            }
        }
        return false;
    }

    private boolean isRoleHigherOrEqualSalesman(RoleType roleType) {
        return switch (roleType) {
            case ROLE_ADMIN, ROLE_SALESMAN, ROLE_COORDINATOR -> true;
            default -> false;
        };
    }

    private boolean userHasRole(MyUser user, RoleType roleType) {
        return user.getUserAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().getName().equals(roleType));
    }

    /*private void addRoleToUser(MyUser user, RoleType roleType){
        Authority authority = find
    }*/

    private Authority findAuthorityByRoleType(RoleType roleType) {
        // Assuming you have an authority repository or some way to get Authority by RoleType
        return authorityRepository.findByName(roleType);
    }

}

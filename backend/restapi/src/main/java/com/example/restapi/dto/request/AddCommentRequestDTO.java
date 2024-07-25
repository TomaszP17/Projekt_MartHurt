package com.example.restapi.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class AddCommentRequestDTO {
    private int employeeId;
    private String productId;
    private String message;

}

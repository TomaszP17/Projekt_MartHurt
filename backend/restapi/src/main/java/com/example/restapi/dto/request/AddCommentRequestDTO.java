package com.example.restapi.dto.request;


import lombok.Data;

@Data
public class AddCommentRequestDTO {

    private int employeeId;
    private String productId;
    private String message;

}

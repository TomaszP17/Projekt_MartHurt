package com.example.restapi.dto.response.comment;

public record CommentResponseDTO(

    int id,
    String message,
    int employeeId,
    String productId

) {
}

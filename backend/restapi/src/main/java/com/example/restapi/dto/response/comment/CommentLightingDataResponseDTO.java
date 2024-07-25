package com.example.restapi.dto.response.comment;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentLightingDataResponseDTO {
    private int id;
    private String message;
}

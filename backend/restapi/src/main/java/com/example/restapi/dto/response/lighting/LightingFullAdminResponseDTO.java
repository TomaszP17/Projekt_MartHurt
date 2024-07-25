package com.example.restapi.dto.response.lighting;

import com.example.restapi.dto.response.comment.CommentLightingDataResponseDTO;
import com.example.restapi.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Data
public class LightingFullAdminResponseDTO extends LightingFullResponseDTO {
    private List<CommentLightingDataResponseDTO> comments;

    public LightingFullAdminResponseDTO(String id, String productMarkingsName, String supplierName,
                                        String productName, BigDecimal nettoClientBuyPrice,
                                        BigDecimal bruttoClientBuyPrice, String description,
                                        String availability, Set<String> shopsNames,
                                        Set<String> images, List<CommentLightingDataResponseDTO> comments) {
        super(id, productMarkingsName, supplierName, productName, nettoClientBuyPrice,
                bruttoClientBuyPrice, description, availability, shopsNames, images);
        this.comments = comments;
    }
}

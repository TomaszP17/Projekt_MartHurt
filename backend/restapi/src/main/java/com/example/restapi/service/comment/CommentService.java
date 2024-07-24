package com.example.restapi.service.comment;

import com.example.restapi.dto.request.AddCommentRequestDTO;
import com.example.restapi.dto.response.comment.CommentResponseDTO;
import com.example.restapi.exceptions.CommentNotFoundException;
import com.example.restapi.exceptions.EmployeeDoesNotExistsException;
import com.example.restapi.exceptions.ProductDoesNotExistsException;

import java.util.List;

public interface CommentService {

    List<CommentResponseDTO> getAllComments();

    CommentResponseDTO addCommentToProduct(AddCommentRequestDTO commentRequestDTO) throws ProductDoesNotExistsException, EmployeeDoesNotExistsException;

    CommentResponseDTO getComment(int commentId) throws CommentNotFoundException;

    void deleteComment(int id) throws CommentNotFoundException;
}

package com.example.restapi.service.comment;

import com.example.restapi.dto.request.AddCommentRequestDTO;
import com.example.restapi.dto.response.comment.CommentResponseDTO;
import com.example.restapi.entity.Comment;
import com.example.restapi.entity.products.Product;
import com.example.restapi.entity.users.Employee;
import com.example.restapi.exceptions.CommentNotFoundException;
import com.example.restapi.exceptions.EmployeeDoesNotExistsException;
import com.example.restapi.exceptions.ProductDoesNotExistsException;
import com.example.restapi.repository.CommentRepository;
import com.example.restapi.repository.EmployeeRepository;
import com.example.restapi.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;
    private final ProductRepository productRepository;
    private final EmployeeRepository employeeRepository;

    public CommentServiceImpl(CommentRepository commentRepository, ProductRepository productRepository, EmployeeRepository employeeRepository) {
        this.commentRepository = commentRepository;
        this.productRepository = productRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<CommentResponseDTO> getAllComments() {
        return commentRepository
                .findAll()
                .stream()
                .map(this::convertIntoDTO)
                .toList();
    }

    @Override
    public CommentResponseDTO addCommentToProduct(AddCommentRequestDTO commentRequestDTO)
            throws ProductDoesNotExistsException, EmployeeDoesNotExistsException {

        Product product = productRepository
                .findById(commentRequestDTO.getProductId())
                .orElseThrow(() -> new ProductDoesNotExistsException("Product with that Id: " + commentRequestDTO.getProductId() + " does not exists"));

        Employee employee = employeeRepository
                .findById(commentRequestDTO.getEmployeeId())
                .orElseThrow(() -> new EmployeeDoesNotExistsException("Employee with that Id: " + commentRequestDTO.getEmployeeId() + "does not exists"));

        Comment comment = new Comment();
        comment.setMessage(commentRequestDTO.getMessage());
        comment.setProduct(product);
        comment.setEmployee(employee);

        Comment savedComment = commentRepository.save(comment);

        return convertIntoDTO(savedComment);
    }

    @Override
    public CommentResponseDTO getComment(int commentId) throws CommentNotFoundException {
        return commentRepository.findById(commentId)
                .map(this::convertIntoDTO)
                .orElseThrow(() -> new CommentNotFoundException("Comment not found with id: " + commentId));
    }

    @Override
    public void deleteComment(int commentId) throws CommentNotFoundException {
        if (commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId);
        } else {
            throw new CommentNotFoundException("Comment not found with id: " + commentId);
        }
    }


    private CommentResponseDTO convertIntoDTO(Comment comment){
        return new CommentResponseDTO(
                comment.getId(),
                comment.getMessage(),
                comment.getEmployee().getMyuserId(),
                comment.getProduct().getId()
        );
    }
}

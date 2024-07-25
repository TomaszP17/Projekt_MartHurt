package com.example.restapi.controller;

import com.example.restapi.dto.request.AddCommentRequestDTO;
import com.example.restapi.dto.response.comment.CommentResponseDTO;
import com.example.restapi.exceptions.CommentNotFoundException;
import com.example.restapi.exceptions.EmployeeDoesNotExistsException;
import com.example.restapi.exceptions.ProductDoesNotExistsException;
import com.example.restapi.service.comment.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<List<CommentResponseDTO>> getAllComments(){
        return ResponseEntity.ok(commentService.getAllComments());
    }


    @PostMapping
    public ResponseEntity<?> addCommentToProduct(@RequestBody AddCommentRequestDTO commentRequestDTO){
        try {
            return ResponseEntity.ok(commentService.addCommentToProduct(commentRequestDTO));
        } catch (ProductDoesNotExistsException | EmployeeDoesNotExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<?> getComment(@PathVariable int commentId){
        try {
            return ResponseEntity.ok(commentService.getComment(commentId));
        } catch (CommentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable int commentId) {
        try {
            commentService.deleteComment(commentId);
            return ResponseEntity.noContent().build();
        } catch (CommentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }
}

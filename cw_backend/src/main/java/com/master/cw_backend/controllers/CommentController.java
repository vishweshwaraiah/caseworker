package com.master.cw_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.master.cw_backend.dtos.CommentDto;
import com.master.cw_backend.services.CommentService;

@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("/comment")
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto) {
        CommentDto savedComment = this.commentService.createComment(commentDto);

        return new ResponseEntity<CommentDto>(savedComment, HttpStatus.CREATED);
    }

    @PutMapping("/comment/{commentId}")
    public ResponseEntity<CommentDto> updateComment(@RequestBody CommentDto commentDto,
            @PathVariable("commentId") Long commentId) {
        CommentDto updatedComment = this.commentService.updateComment(commentDto, commentId);

        return new ResponseEntity<CommentDto>(updatedComment, HttpStatus.OK);
    }

    @GetMapping("/comments/{postId}")
    public ResponseEntity<List<CommentDto>> getCommentsByPostId(@PathVariable("postId") Long postId) {
        List<CommentDto> commentDtos = this.commentService.getCommentsByPostId(postId);

        return ResponseEntity.ok(commentDtos);
    }
}

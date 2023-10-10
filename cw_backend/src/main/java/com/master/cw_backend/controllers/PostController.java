package com.master.cw_backend.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.master.cw_backend.dtos.PostDto;
import com.master.cw_backend.services.PostService;
import com.master.cw_backend.utils.ApiResponse;
import com.master.cw_backend.utils.PostRequest;
import com.master.cw_backend.utils.PostResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("/post")
    public ResponseEntity<PostDto> createPost(@Valid @RequestBody PostDto postDto,
            @RequestParam(name = "userId", required = true) Long userId,
            @RequestParam(name = "categoryId", required = true) Long categoryId) {
        PostDto savedPost = this.postService.createPost(postDto, userId, categoryId);
        return new ResponseEntity<PostDto>(savedPost, HttpStatus.CREATED);
    }

    @PutMapping("/post/{id}")
    public ResponseEntity<PostDto> updatePostById(@Valid @RequestBody PostRequest postRequest,
            @PathVariable("id") Long id) {
        PostDto postDto = this.postService.updatePost(postRequest, id);
        return new ResponseEntity<PostDto>(postDto, HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity<PostResponse> getAllPosts(
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "2", required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        PostResponse postResponse = this.postService.getAllPosts(pageNumber, pageSize, sortBy, sortDir);

        return new ResponseEntity<PostResponse>(postResponse, HttpStatus.OK);
    }

    @DeleteMapping("/post/{id}")
    public ResponseEntity<ApiResponse> deletePostById(@PathVariable("id") Long id) {
        Boolean deleted = this.postService.deletePost(id);

        return new ResponseEntity<ApiResponse>(
                new ApiResponse("Post with id " + id + " deleted successfully!!", deleted), HttpStatus.OK);
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable("id") Long id) {
        PostDto postDto = this.postService.getPostById(id);

        return new ResponseEntity<PostDto>(postDto, HttpStatus.OK);
    }

    @GetMapping("/post")
    public ResponseEntity<List<PostDto>> getPostsById(
            @RequestParam(name = "userId", required = false) Long userId,
            @RequestParam(name = "categoryId", required = false) Long categoryId) {
        List<PostDto> postsList = new ArrayList<>();
        if (userId != null && categoryId != null) {
            postsList = this.postService.findByCategoryAndUser(categoryId, userId);
        }

        if (userId != null) {
            postsList = this.postService.getPostsByUserId(userId);
        }

        if (categoryId != null) {
            postsList = this.postService.getPostsByCategoryId(categoryId);
        }

        return new ResponseEntity<List<PostDto>>(postsList, HttpStatus.OK);
    }

}

package com.master.ims_mart.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.master.ims_mart.constants.AppConstants;
import com.master.ims_mart.dtos.PostDto;
import com.master.ims_mart.services.FileService;
import com.master.ims_mart.services.PostService;
import com.master.ims_mart.utils.ApiResponse;
import com.master.ims_mart.utils.PostResponse;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    PostService postService;

    @Autowired
    FileService fileService;

    @PostMapping("/post")
    public ResponseEntity<PostDto> createPost(@Valid @RequestBody PostDto postDto) {
        PostDto savedPost = this.postService.createPost(postDto);
        return new ResponseEntity<PostDto>(savedPost, HttpStatus.CREATED);
    }

    @PutMapping("/post/{id}")
    public ResponseEntity<PostDto> updatePostById(@Valid @RequestBody PostDto postDto,
            @PathVariable("id") Long id) {
        PostDto updatedPost = this.postService.updatePost(postDto, id);
        return new ResponseEntity<PostDto>(updatedPost, HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity<PostResponse> getAllPosts(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(name = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir) {
        PostResponse postResponse = this.postService.getAllPosts(pageNumber, pageSize, sortBy, sortDir);

        return new ResponseEntity<PostResponse>(postResponse, HttpStatus.OK);
    }

    @DeleteMapping("/post/{id}")
    public ResponseEntity<ApiResponse> deletePostById(@PathVariable("id") Long id) {
        Boolean deleted = this.postService.deletePost(id);

        return new ResponseEntity<ApiResponse>(
                new ApiResponse("Post " + id + " deleted successfully!",
                        AppConstants.POST_DELETE,
                        deleted),
                HttpStatus.OK);
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable("id") Long id) {
        PostDto postDto = this.postService.getPostById(id);

        return new ResponseEntity<PostDto>(postDto, HttpStatus.OK);
    }

    @GetMapping("/posts/search/{keyword}")
    public ResponseEntity<List<PostDto>> getPostByKeyword(@PathVariable("keyword") String keyword) {
        List<PostDto> postDtos = this.postService.findBySearchkey(keyword);

        return new ResponseEntity<List<PostDto>>(postDtos, HttpStatus.OK);
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

    @PostMapping("/upload")
    public ResponseEntity<PostDto> uploadImage(@RequestParam(name = "image", required = true) MultipartFile image,
            @RequestParam(name = "postId", required = true) Long postId) throws IOException {
        System.out.println(image.getOriginalFilename());
        PostDto postDto = this.postService.getPostById(postId);

        String fileName = this.fileService.uploadImage(AppConstants.IMAGE_PATH, image);

        postDto.setPostImage(fileName);
        PostDto updatedPost = this.postService.updatePost(postDto, postId);

        return new ResponseEntity<PostDto>(updatedPost, HttpStatus.OK);
    }

    @GetMapping(value = "/serveimage", produces = MediaType.IMAGE_PNG_VALUE)
    public void downloadImage(HttpServletResponse response,
            @RequestParam(name = "fileName", required = true) String fileName) throws IOException {
        InputStream resource = this.fileService.getResource(AppConstants.IMAGE_PATH, fileName);
        response.setContentType(MediaType.IMAGE_PNG_VALUE);
        StreamUtils.copy(resource, response.getOutputStream());
    }

}

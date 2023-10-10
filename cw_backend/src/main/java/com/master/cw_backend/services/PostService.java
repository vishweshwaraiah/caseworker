package com.master.cw_backend.services;

import java.util.List;

import com.master.cw_backend.dtos.PostDto;
import com.master.cw_backend.entities.PostEntity;
import com.master.cw_backend.utils.PostRequest;
import com.master.cw_backend.utils.PostResponse;

public interface PostService {
    PostDto createPost(PostDto postDto, Long userId, Long categoryId);

    PostDto updatePost(PostRequest postRequest, Long id);

    PostDto getPostById(Long id);

    PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);

    Boolean deletePost(Long id);

    List<PostDto> getPostsByUserId(Long userId);

    List<PostDto> getPostsByCategoryId(Long categoryId);

    List<PostDto> findByCategoryAndUser(Long categoryId, Long userId);

    PostDto postEntityToDto(PostEntity postEntity);

    PostEntity postDtoToEntity(PostDto postDto);
}

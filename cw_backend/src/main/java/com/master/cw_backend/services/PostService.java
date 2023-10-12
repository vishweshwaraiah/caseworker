package com.master.cw_backend.services;

import java.util.List;

import com.master.cw_backend.dtos.PostDto;
import com.master.cw_backend.entities.PostEntity;
import com.master.cw_backend.utils.PostResponse;

public interface PostService {
    PostDto createPost(PostDto postDto);

    PostDto updatePost(PostDto postDto, Long id);

    PostDto getPostById(Long id);

    PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);

    Boolean deletePost(Long id);

    List<PostDto> getPostsByUserId(Long userId);

    List<PostDto> getPostsByCategoryId(Long categoryId);

    List<PostDto> findByCategoryAndUser(Long categoryId, Long userId);

    List<PostDto> findBySearchkey(String keyword);

    PostDto postEntityToDto(PostEntity postEntity);

    PostEntity postDtoToEntity(PostDto postDto);
}

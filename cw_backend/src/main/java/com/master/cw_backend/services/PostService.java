package com.master.cw_backend.services;

import java.util.List;

import com.master.cw_backend.dtos.PostDto;
import com.master.cw_backend.entities.PostEntity;

public interface PostService {
    PostDto createPost(PostDto postDto);

    PostDto updatePost(PostDto postDto, Long id);

    PostDto getPostById(Long id);

    List<PostDto> getAllPosts();

    Boolean deletePost(Long id);

    PostDto postEntityToDto(PostEntity postEntity);

    PostEntity postDtoToEntity(PostDto postDto);
}

package com.master.ims_mart.services.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.master.ims_mart.dtos.PostDto;
import com.master.ims_mart.entities.CategoryEntity;
import com.master.ims_mart.entities.PostEntity;
import com.master.ims_mart.entities.UserEntity;
import com.master.ims_mart.exceptions.ResourceNotFoundException;
import com.master.ims_mart.repositories.CategoryRepository;
import com.master.ims_mart.repositories.PostRepository;
import com.master.ims_mart.repositories.UserRepository;
import com.master.ims_mart.services.PostService;
import com.master.ims_mart.utils.PostResponse;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public PostDto createPost(PostDto postDto) {

        Long userId = postDto.getUserId();
        Long categoryId = postDto.getCategoryId();

        UserEntity userEntity = this.userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        CategoryEntity categoryEntity = this.categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

        PostEntity postEntity = this.postDtoToEntity(postDto);
        postEntity.setCategory(categoryEntity);
        postEntity.setUser(userEntity);
        postEntity.setPostCreatedOn(new Date());
        postEntity.setPostUpdatedOn(new Date());
        postEntity.setPostImage("default.png");

        PostEntity savedPost = this.postRepository.save(postEntity);

        return this.postEntityToDto(savedPost);
    }

    @Override
    public PostDto updatePost(PostDto postDto, Long id) {
        PostEntity postEntity = this.postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));

        postEntity.setPostTitle(postDto.getPostTitle());
        postEntity.setPostContent(postDto.getPostContent());
        if (postDto.getPostImage() != null) {
            postEntity.setPostImage(postDto.getPostImage());
        }
        if (postDto.getCategoryId() != null) {
            Long categoryId = postDto.getCategoryId();
            CategoryEntity categoryEntity = this.categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));
            postEntity.setCategory(categoryEntity);
        }
        if (postDto.getUserId() != null) {
            Long userId = postDto.getUserId();
            UserEntity userEntity = this.userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
            postEntity.setUser(userEntity);
        }

        postEntity.setPostUpdatedOn(new Date());

        PostEntity updatedPost = this.postRepository.save(postEntity);

        return this.postEntityToDto(updatedPost);
    }

    @Override
    public PostDto getPostById(Long id) {
        PostEntity postEntity = this.postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));

        return this.postEntityToDto(postEntity);
    }

    @Override
    public PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {

        Sort sort = Sort.by(sortBy).ascending();

        if (sortDir.equalsIgnoreCase("desc")) {
            sort = Sort.by(sortBy).descending();
        }

        Pageable Pgb = PageRequest.of(pageNumber, pageSize, sort);
        Page<PostEntity> pagePost = this.postRepository.findAll(Pgb);
        List<PostEntity> postEntities = pagePost.getContent();

        List<PostDto> postDtos = postEntities.stream().map(post -> this.postEntityToDto(post))
                .collect(Collectors.toList());

        PostResponse postResponse = new PostResponse();

        postResponse.setPosts(postDtos);
        postResponse.setPageNumber(pagePost.getNumber());
        postResponse.setPageSize(pagePost.getSize());
        postResponse.setTotalElements(pagePost.getTotalElements());
        postResponse.setTotalPages(pagePost.getTotalPages());
        postResponse.setLastpage(pagePost.isLast());

        return postResponse;
    }

    @Override
    public Boolean deletePost(Long id) {
        PostEntity postEntity = this.postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));

        this.postRepository.delete(postEntity);

        return true;
    }

    @Override
    public List<PostDto> getPostsByUserId(Long userId) {

        UserEntity userEntity = this.userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        List<PostEntity> postEntities = this.postRepository.findByUser(userEntity);

        List<PostDto> postDtos = postEntities.stream().map(post -> this.postEntityToDto(post))
                .collect(Collectors.toList());

        return postDtos;
    }

    @Override
    public List<PostDto> getPostsByCategoryId(Long categoryId) {
        CategoryEntity categoryEntity = this.categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

        List<PostEntity> postEntities = this.postRepository.findByCategory(categoryEntity);

        List<PostDto> postDtos = postEntities.stream().map(post -> this.postEntityToDto(post))
                .collect(Collectors.toList());

        return postDtos;
    }

    @Override
    public List<PostDto> findByCategoryAndUser(Long categoryId, Long userId) {

        CategoryEntity categoryEntity = this.categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

        UserEntity userEntity = this.userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        List<PostEntity> postEntities = this.postRepository.findByCategoryAndUser(categoryEntity, userEntity);

        List<PostDto> postDtos = postEntities.stream().map(post -> this.postEntityToDto(post))
                .collect(Collectors.toList());

        return postDtos;
    }

    @Override
    public List<PostDto> findBySearchkey(String keyword) {
        List<PostEntity> postEntities = this.postRepository.findBySearchkey("%" + keyword + "%");

        List<PostDto> postDtos = postEntities.stream().map(post -> this.postEntityToDto(post))
                .collect(Collectors.toList());

        return postDtos;
    }

    @Override
    public PostDto postEntityToDto(PostEntity postEntity) {
        PostDto postDto = this.modelMapper.map(postEntity, PostDto.class);
        return postDto;
    }

    @Override
    public PostEntity postDtoToEntity(PostDto postDto) {
        PostEntity postEntity = this.modelMapper.map(postDto, PostEntity.class);
        return postEntity;
    }

}

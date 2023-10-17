package com.master.cw_backend.dtos;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PostDto {

    private Long id;

    @NotEmpty
    @Size(min = 10, message = "Post title must be at least 10 chars long!")
    private String postTitle;

    @NotEmpty
    @Size(min = 25, message = "Post content must be at least 25 chars long!")
    private String postContent;

    private String postImage;

    private Date postCreatedOn;

    private Date postUpdatedOn;

    @NotNull(message = "Category id must not be null!")
    @DecimalMin(message = "Category id must be valid!", value = "1")
    private Long categoryId;

    @NotNull(message = "User id must not be null!")
    @DecimalMin(message = "User id must be valid!", value = "1")
    private Long userId;

    private Set<CommentDto> comments = new HashSet<>();
}

package com.master.cw_backend.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CommentDto {

    private Long id;

    @NotEmpty(message = "Comment must have some content!")
    @Size(min = 20, max = 1000)
    private String commentContent;

    @NotNull(message = "Comment must have a post id!")
    private Long postId;

    @NotNull(message = "Comment must have a user id!")
    private Long userId;
}

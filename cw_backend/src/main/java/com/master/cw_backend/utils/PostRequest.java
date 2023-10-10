package com.master.cw_backend.utils;

import java.util.Date;

import org.springframework.http.HttpStatusCode;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class PostRequest {

    public static final HttpStatusCode OK = null;
    private Long id;

    @NotEmpty
    private String postTitle;

    @NotEmpty
    private String postContent;

    private String postImage;

    private Date postCreatedOn;

    private Date postUpdatedOn;

    private Long categoryId;

    private Long userId;

}

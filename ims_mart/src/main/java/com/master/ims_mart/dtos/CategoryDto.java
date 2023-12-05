package com.master.ims_mart.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryDto {
    private Long id;

    @NotEmpty
    @Size(min = 10, max = 100, message = "Category title must be atleast 10 chars long!")
    private String categoryTitle;

    @NotEmpty
    @Size(min = 25, max = 1000, message = "Category description must be atleast 10 chars long!")
    private String categoryDescription;
}

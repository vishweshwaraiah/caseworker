package com.master.cw_backend.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CategoryDto {
    private Long id;

    @NotEmpty
    @Size(min = 10, max = 100, message = "Category title must be atleast 10 chars long!")
    private String categoryTitle;

    @NotEmpty
    @Size(min = 25, max = 1000, message = "Category description must be atleast 10 chars long!")
    private String categoryDescription;
}

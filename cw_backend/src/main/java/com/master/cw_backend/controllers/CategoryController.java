package com.master.cw_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.master.cw_backend.constants.AppConstants;
import com.master.cw_backend.dtos.CategoryDto;
import com.master.cw_backend.services.CategoryService;
import com.master.cw_backend.utils.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @PostMapping("/category")
    public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CategoryDto categoryDto) {
        CategoryDto createCategory = this.categoryService.createCategory(categoryDto);

        return new ResponseEntity<CategoryDto>(createCategory, HttpStatus.CREATED);
    }

    @PutMapping("/category/{id}")
    public ResponseEntity<CategoryDto> updateCategory(@Valid @RequestBody CategoryDto categoryDto,
            @PathVariable("id") Long id) {
        CategoryDto updatedCategory = this.categoryService.updateCategory(categoryDto, id);

        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("category/{id}")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable("id") Long id) {
        Boolean deleted = this.categoryService.deleteCategory(id);

        return new ResponseEntity<ApiResponse>(
                new ApiResponse("Category " + id + " deleted successfully!", AppConstants.CATEGORY_DELETE, deleted),
                HttpStatus.OK);
    }

    @GetMapping("categories")
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> categories = this.categoryService.getAllCategories();

        return ResponseEntity.ok(categories);
    }

    @GetMapping("category/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable("id") Long id) {
        CategoryDto categoryDto = this.categoryService.getCategoryById(id);

        return new ResponseEntity<CategoryDto>(categoryDto, HttpStatus.OK);
    }

}

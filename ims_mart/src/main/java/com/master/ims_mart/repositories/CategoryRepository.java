package com.master.ims_mart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.master.ims_mart.entities.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

}

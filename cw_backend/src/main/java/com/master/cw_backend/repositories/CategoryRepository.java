package com.master.cw_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.master.cw_backend.entities.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

}

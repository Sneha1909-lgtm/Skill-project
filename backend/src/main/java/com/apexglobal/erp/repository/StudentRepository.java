package com.apexglobal.erp.repository;

import com.apexglobal.erp.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUser_Username(String username);
    Optional<Student> findByUniversityId(String universityId);
    Page<Student> findByBatch(String batch, Pageable pageable);
    long countByBatch(String batch);
}

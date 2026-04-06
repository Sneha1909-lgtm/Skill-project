package com.apexglobal.erp.repository;

import com.apexglobal.erp.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    Optional<Faculty> findByUser_Username(String username);
    List<Faculty> findByDepartment(String department);
}

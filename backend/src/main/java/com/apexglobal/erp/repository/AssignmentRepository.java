package com.apexglobal.erp.repository;

import com.apexglobal.erp.entity.Assignment;
import com.apexglobal.erp.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findBySubject(Subject subject);
}

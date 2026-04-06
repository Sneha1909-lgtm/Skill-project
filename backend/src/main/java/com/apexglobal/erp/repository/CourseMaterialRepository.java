package com.apexglobal.erp.repository;

import com.apexglobal.erp.entity.CourseMaterial;
import com.apexglobal.erp.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseMaterialRepository extends JpaRepository<CourseMaterial, Long> {
    List<CourseMaterial> findBySubject(Subject subject);
}

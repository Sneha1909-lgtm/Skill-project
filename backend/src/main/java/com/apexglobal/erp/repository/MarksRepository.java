package com.apexglobal.erp.repository;

import com.apexglobal.erp.entity.Marks;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MarksRepository extends JpaRepository<Marks, Long> {
    Optional<Marks> findByStudent_StudentIdAndSubject_SubjectId(Long studentId, Long subjectId);
}

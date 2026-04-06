package com.apexglobal.erp.repository;

import com.apexglobal.erp.entity.ExamResult;
import com.apexglobal.erp.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {
    List<ExamResult> findByStudent(Student student);
    List<ExamResult> findByStudent_StudentId(Long studentId);
}

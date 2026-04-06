package com.apexglobal.erp.repository;

import com.apexglobal.erp.entity.Complaint;
import com.apexglobal.erp.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByStudent(Student student);
    List<Complaint> findByStatus(String status);
    List<Complaint> findByStudent_StudentId(Long studentId);
}

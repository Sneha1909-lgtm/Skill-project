package com.apexglobal.erp.repository;

import com.apexglobal.erp.entity.LeaveRequest;
import com.apexglobal.erp.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByStudent(Student student);
    List<LeaveRequest> findByStatus(String status);
    List<LeaveRequest> findByStudent_StudentId(Long studentId);
}

package com.apexglobal.erp.repository;

import com.apexglobal.erp.entity.Assignment;
import com.apexglobal.erp.entity.AssignmentSubmission;
import com.apexglobal.erp.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AssignmentSubmissionRepository extends JpaRepository<AssignmentSubmission, Long> {
    List<AssignmentSubmission> findByAssignment(Assignment assignment);
    Optional<AssignmentSubmission> findByAssignmentAndSubmittedBy(Assignment assignment, Student student);
}

package com.apexglobal.erp.service;

import com.apexglobal.erp.entity.Marks;
import com.apexglobal.erp.entity.Subject;
import com.apexglobal.erp.entity.Student;
import com.apexglobal.erp.repository.MarksRepository;
import com.apexglobal.erp.repository.SubjectRepository;
import com.apexglobal.erp.repository.UserRepository;
import com.apexglobal.erp.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional
public class MarksService {

    private final MarksRepository marksRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    public record MarksUpdateDto(@lombok.NonNull Long studentId, @lombok.NonNull Long subjectId, BigDecimal marks, String grade) {}

    public void addOrUpdateMarks(MarksUpdateDto dto, String facultyUsername) {
        Long studentId = dto.studentId();
        Long subjectId = dto.subjectId();

        if (studentId == null || subjectId == null) {
            throw new IllegalArgumentException("Student ID and Subject ID must not be null");
        }

        var faculty = userRepository.findByUsername(facultyUsername)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        // Data Ownership Explicit Check
        if (subject.getFaculty() == null || !subject.getFaculty().getUserId().equals(faculty.getUserId())) {
            throw new AccessDeniedException("You are solely authorized to evaluate assigned subjects.");
        }

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Marks mark = marksRepository.findByStudent_StudentIdAndSubject_SubjectId(studentId, subjectId)
                .orElseGet(() -> {
                    Marks newMark = new Marks();
                    newMark.setStudent(student);
                    newMark.setSubject(subject);
                    return newMark;
                });
        
        mark.setMarksAmount(dto.marks());
        mark.setGrade(dto.grade());
        mark.setEvaluatedBy(faculty);
        
        marksRepository.save(mark);
    }
}

package com.apexglobal.erp.controller;

import com.apexglobal.erp.repository.ExamResultRepository;
import com.apexglobal.erp.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class ResultController {

    private final ExamResultRepository examResultRepository;
    private final StudentRepository studentRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getMyResults(@AuthenticationPrincipal UserDetails userDetails) {
        return studentRepository.findByUser_Username(userDetails.getUsername())
                .map(s -> {
                    List<Map<String, Object>> results = examResultRepository.findByStudent(s).stream()
                            .map(r -> Map.of(
                                    "id", (Object) r.getId(),
                                    "semester", r.getSemester() != null ? r.getSemester() : "",
                                    "academicYear", r.getAcademicYear() != null ? r.getAcademicYear() : "",
                                    "cgpa", r.getCgpa() != null ? r.getCgpa() : 0.0,
                                    "totalCredits", r.getTotalCredits() != null ? r.getTotalCredits() : 0,
                                    "subjectsJson", r.getSubjectsJson() != null ? r.getSubjectsJson() : "[]"
                            )).toList();
                    return ResponseEntity.ok(results);
                }).orElse(ResponseEntity.notFound().build());
    }
}

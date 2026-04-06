package com.apexglobal.erp.controller;

import com.apexglobal.erp.repository.SubjectRepository;
import com.apexglobal.erp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;

    @GetMapping("/assigned")
    public ResponseEntity<?> getAssignedSubjects(@AuthenticationPrincipal UserDetails userDetails) {
        return userRepository.findByUsername(userDetails.getUsername())
                .map(u -> {
                    List<Map<String, Object>> subjects = subjectRepository.findAll().stream()
                            .filter(s -> s.getFaculty() != null && s.getFaculty().getUserId().equals(u.getUserId()))
                            .map(s -> Map.of(
                                    "id", (Object) s.getSubjectId(),
                                    "name", s.getName()
                            )).toList();
                    return ResponseEntity.ok(subjects);
                }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllSubjects() {
        List<Map<String, Object>> subjects = subjectRepository.findAll().stream()
                .map(s -> Map.of(
                        "id", (Object) s.getSubjectId(),
                        "name", s.getName(),
                        "faculty", (Object) (s.getFaculty() != null ? s.getFaculty().getUsername() : "Unassigned")
                )).toList();
        return ResponseEntity.ok(subjects);
    }
}

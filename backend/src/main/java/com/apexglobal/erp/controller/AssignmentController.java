package com.apexglobal.erp.controller;

import com.apexglobal.erp.entity.*;
import com.apexglobal.erp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentRepository assignmentRepository;
    private final SubjectRepository subjectRepository;
    private final StudentRepository studentRepository;
    private final AssignmentSubmissionRepository submissionRepository;

    @GetMapping("/subject/{subjectId}")
    @SuppressWarnings("null")
    public ResponseEntity<?> getAssignmentsBySubject(@PathVariable long subjectId) {
        return subjectRepository.findById(subjectId)
                .map(sub -> {
                    List<Assignment> assignments = assignmentRepository.findBySubject(sub);
                    return ResponseEntity.ok(assignments.stream().map(this::toAssignmentMap).toList());
                }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/submit")
    @SuppressWarnings("null")
    public ResponseEntity<?> submitAssignment(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Map<String, Object> body) {
        long assignmentId = Long.parseLong(body.get("assignmentId").toString());
        String base64File = (String) body.get("file");
        String note = (String) body.get("note");

        Student student = studentRepository.findByUser_Username(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Student Node Not Found"));

        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment Node Not Found"));

        try {
            String[] parts = base64File.split(",");
            String data = parts[1];
            String mimeType = parts[0].split(";")[0].split(":")[1];
            String extension = mimeType.split("/")[1];
            byte[] bytes = Base64.getDecoder().decode(data);

            String fileName = "sub_" + student.getUniversityId().replace("/", "_") + "_" + assignmentId + "." + extension;
            Path uploadDir = Paths.get("uploads", "submissions");
            Files.createDirectories(uploadDir);
            Path filePath = uploadDir.resolve(fileName);
            Files.write(filePath, bytes);

            String finalUrl = "/uploads/submissions/" + fileName;

            AssignmentSubmission submission = submissionRepository.findByAssignmentAndSubmittedBy(assignment, student)
                    .orElse(new AssignmentSubmission());

            submission.setAssignment(assignment);
            submission.setSubmittedBy(student);
            submission.setSubmissionFileUrl(finalUrl);
            submission.setStudentNote(note);
            submission.setSubmittedAt(LocalDateTime.now());

            submissionRepository.save(submission);

            return ResponseEntity.ok(Map.of("message", "Assignment Transmitted Successfully", "url", finalUrl));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Transmission Error: " + e.getMessage()));
        }
    }

    @GetMapping("/submissions/me")
    @SuppressWarnings("null")
    public ResponseEntity<?> getMySubmissions(@AuthenticationPrincipal UserDetails userDetails) {
        Student student = studentRepository.findByUser_Username(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Student Node Not Found"));
        
        List<AssignmentSubmission> submissions = submissionRepository.findAll().stream()
                .filter(s -> s.getSubmittedBy().getStudentId().equals(student.getStudentId()))
                .toList();
        
        return ResponseEntity.ok(submissions.stream().map(this::toSubmissionMap).toList());
    }

    private Map<String, Object> toAssignmentMap(Assignment a) {
        java.util.Map<String, Object> map = new java.util.HashMap<>();
        map.put("id", a.getId());
        map.put("title", a.getTitle() != null ? a.getTitle() : "Untitled Assignment");
        map.put("instructions", a.getInstructions() != null ? a.getInstructions() : "");
        map.put("deadline", a.getDeadline() != null ? a.getDeadline().toString() : "");
        map.put("maxMarks", a.getMaxMarks() != null ? a.getMaxMarks() : 100);
        map.put("postedAt", a.getPostedAt() != null ? a.getPostedAt().toString() : "");
        return map;
    }

    private Map<String, Object> toSubmissionMap(AssignmentSubmission s) {
        java.util.Map<String, Object> map = new java.util.HashMap<>();
        map.put("id", s.getId());
        map.put("assignmentId", s.getAssignment() != null ? s.getAssignment().getId() : null);
        map.put("assignmentTitle", s.getAssignment() != null ? s.getAssignment().getTitle() : "Unknown");
        map.put("fileUrl", s.getSubmissionFileUrl() != null ? s.getSubmissionFileUrl() : "");
        map.put("submittedAt", s.getSubmittedAt() != null ? s.getSubmittedAt().toString() : "");
        map.put("marks", s.getMarksObtained() != null ? s.getMarksObtained() : "Pending Evaluation");
        return map;
    }
}

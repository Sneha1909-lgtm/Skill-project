package com.apexglobal.erp.controller;

import com.apexglobal.erp.entity.Student;
import com.apexglobal.erp.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@lombok.extern.slf4j.Slf4j
public class StudentController {

    private final StudentRepository studentRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return studentRepository.findByUser_Username(userDetails.getUsername())
                .map(s -> ResponseEntity.ok(toMap(s)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String batch
    ) {
        PageRequest pr = PageRequest.of(page, size, Sort.by("name"));
        Page<Student> result = (batch != null && !batch.isBlank())
                ? studentRepository.findByBatch(batch, pr)
                : studentRepository.findAll(pr);
        return ResponseEntity.ok(Map.of(
            "content", result.getContent().stream().map(this::toMap).toList(),
            "totalElements", result.getTotalElements(),
            "totalPages", result.getTotalPages(),
            "page", page
        ));
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Map<String, Object> updates) {
        Student s = studentRepository.findByUser_Username(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (updates.containsKey("name")) s.setName((String) updates.get("name"));
        if (updates.containsKey("universityId")) s.setUniversityId((String) updates.get("universityId"));
        if (updates.containsKey("course")) s.setCourse((String) updates.get("course"));
        if (updates.containsKey("branch")) s.setBranch((String) updates.get("branch"));
        if (updates.containsKey("department")) s.setDepartment((String) updates.get("department"));
        if (updates.containsKey("semester")) s.setSemester((String) updates.get("semester"));
        if (updates.containsKey("batch")) s.setBatch((String) updates.get("batch"));
        
        try {
            if (updates.containsKey("cgpa") && updates.get("cgpa") != null && !updates.get("cgpa").toString().isBlank()) 
                s.setCgpa(Double.valueOf(updates.get("cgpa").toString()));
            if (updates.containsKey("attendancePercent") && updates.get("attendancePercent") != null && !updates.get("attendancePercent").toString().isBlank()) 
                s.setAttendancePercent(Double.valueOf(updates.get("attendancePercent").toString()));
        } catch (NumberFormatException e) {
            log.warn("Invalid numeric format during profile update: {}", e.getMessage());
        }

        if (updates.containsKey("gender")) s.setGender((String) updates.get("gender"));
        if (updates.containsKey("phone")) s.setPhone((String) updates.get("phone"));
        if (updates.containsKey("bloodGroup")) s.setBloodGroup((String) updates.get("bloodGroup"));
        if (updates.containsKey("hostelStatus")) s.setHostelStatus((String) updates.get("hostelStatus"));
        if (updates.containsKey("roomNo")) s.setRoomNo((String) updates.get("roomNo"));
        
        try {
            if (updates.containsKey("dob") && updates.get("dob") != null && !updates.get("dob").toString().isBlank()) 
                s.setDob(java.time.LocalDate.parse((String) updates.get("dob")));
        } catch (java.time.format.DateTimeParseException e) {
            log.warn("Invalid date format during profile update: {}", e.getMessage());
        }

        if (updates.containsKey("address")) s.setAddress((String) updates.get("address"));
        if (updates.containsKey("nationality")) s.setNationality((String) updates.get("nationality"));
        if (updates.containsKey("religion")) s.setReligion((String) updates.get("religion"));
        if (updates.containsKey("motherTongue")) s.setMotherTongue((String) updates.get("motherTongue"));
        if (updates.containsKey("placeOfBirth")) s.setPlaceOfBirth((String) updates.get("placeOfBirth"));
        if (updates.containsKey("height")) s.setHeight((String) updates.get("height"));
        if (updates.containsKey("weight")) s.setWeight((String) updates.get("weight"));

        @SuppressWarnings("null") Student saved = studentRepository.save(s);
        return ResponseEntity.ok(Map.of("message", "Profile updated successfully.", "student", toMap(saved)));
    }

    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadImage(@org.springframework.security.core.annotation.AuthenticationPrincipal UserDetails userDetails, @RequestBody java.util.Map<String, String> body) {
        String base64Image = body.get("image");
        if (base64Image == null || !base64Image.contains(",")) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", "Invalid image node."));
        }

        Student s = studentRepository.findByUser_Username(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (s.getProfileImage() != null && !s.getProfileImage().isBlank() && !isAdmin) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", "Profile image can only be uploaded once. Contact admin for resets."));
        }

        try {
            // Specialized File Extraction Node
            String[] parts = base64Image.split(",");
            String data = parts[1];
            String mimeType = parts[0].split(";")[0].split(":")[1];
            String extension = mimeType.split("/")[1];
            byte[] bytes = java.util.Base64.getDecoder().decode(data);

            String fileName = "prof_" + s.getUniversityId().replace("/", "_") + "." + extension;
            java.nio.file.Path uploadDir = java.nio.file.Paths.get("uploads", "profiles");
            java.nio.file.Files.createDirectories(uploadDir);
            java.nio.file.Path filePath = uploadDir.resolve(fileName);
            java.nio.file.Files.write(filePath, bytes);

            String finalUrl = "/uploads/profiles/" + fileName;
            s.setProfileImage(finalUrl);
            studentRepository.save(s);
            return ResponseEntity.ok(java.util.Map.of("message", "Physical Link Established", "imageUrl", finalUrl));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(java.util.Map.of("message", "Filesystem Sync Error: " + e.getMessage()));
        }
    }

    private Map<String, Object> toMap(Student s) {
        java.util.Map<String, Object> map = new java.util.HashMap<>();
        map.put("studentId", s.getStudentId());
        map.put("name", s.getName() != null ? s.getName() : "");
        map.put("universityId", s.getUniversityId() != null ? s.getUniversityId() : "");
        map.put("course", s.getCourse() != null ? s.getCourse() : "");
        map.put("branch", s.getBranch() != null ? s.getBranch() : "");
        map.put("semester", s.getSemester() != null ? s.getSemester() : "");
        map.put("batch", s.getBatch() != null ? s.getBatch() : "");
        map.put("cgpa", s.getCgpa() != null ? s.getCgpa() : 0.0);
        map.put("attendancePercent", s.getAttendancePercent() != null ? s.getAttendancePercent() : 0.0);
        map.put("hostelStatus", s.getHostelStatus() != null ? s.getHostelStatus() : "Day Scholar");
        map.put("roomNo", s.getRoomNo() != null ? s.getRoomNo() : "");
        map.put("phone", s.getPhone() != null ? s.getPhone() : "");
        map.put("gender", s.getGender() != null ? s.getGender() : "");
        map.put("bloodGroup", s.getBloodGroup() != null ? s.getBloodGroup() : "");
        map.put("email", s.getUser() != null ? s.getUser().getEmail() : "");
        map.put("department", s.getDepartment() != null ? s.getDepartment() : "");
        map.put("dob", s.getDob() != null ? s.getDob().toString() : "");
        map.put("address", s.getAddress() != null ? s.getAddress() : "");
        map.put("profileImage", s.getProfileImage() != null ? s.getProfileImage() : "");
        return map;
    }
}

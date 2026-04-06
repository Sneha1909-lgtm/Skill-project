package com.apexglobal.erp.controller;

import com.apexglobal.erp.entity.Faculty;
import com.apexglobal.erp.repository.FacultyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/faculty")
@RequiredArgsConstructor
@lombok.extern.slf4j.Slf4j
@SuppressWarnings("null")
public class FacultyController {

    private final FacultyRepository facultyRepository;
    private final com.apexglobal.erp.service.MarksService marksService;

    @PostMapping("/marks")
    public ResponseEntity<?> updateMarks(@RequestBody com.apexglobal.erp.service.MarksService.MarksUpdateDto dto, @AuthenticationPrincipal UserDetails userDetails) {
        marksService.addOrUpdateMarks(dto, userDetails.getUsername());
        return ResponseEntity.ok(Map.of("message", "Marks updated successfully"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return facultyRepository.findByUser_Username(userDetails.getUsername())
                .map(f -> ResponseEntity.ok(toMap(f)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Map<String, Object> updates) {
        Faculty f = facultyRepository.findByUser_Username(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        if (updates.containsKey("name")) f.setName((String) updates.get("name"));
        if (updates.containsKey("universityId")) f.setUniversityId((String) updates.get("universityId"));
        if (updates.containsKey("department")) f.setDepartment((String) updates.get("department"));
        if (updates.containsKey("designation")) f.setDesignation((String) updates.get("designation"));
        if (updates.containsKey("specialization")) f.setSpecialization((String) updates.get("specialization"));
        if (updates.containsKey("phone")) f.setPhone((String) updates.get("phone"));
        if (updates.containsKey("qualification")) f.setQualification((String) updates.get("qualification"));
        if (updates.containsKey("gender")) f.setGender((String) updates.get("gender"));
        if (updates.containsKey("experience")) f.setExperience((String) updates.get("experience"));
        if (updates.containsKey("cabinNo")) f.setCabinNo((String) updates.get("cabinNo"));

        @SuppressWarnings("null") Faculty saved = facultyRepository.save(f);
        return ResponseEntity.ok(Map.of("message", "Faculty profile updated successfully.", "faculty", toMap(saved)));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllFaculty() {
        List<Map<String, Object>> result = facultyRepository.findAll().stream()
                .map(this::toMap).toList();
        return ResponseEntity.ok(Map.of("content", result, "totalElements", result.size()));
    }

    private final com.apexglobal.erp.repository.StudentRepository studentRepository;

    @PutMapping("/student/{id}/academic-details")
    public ResponseEntity<?> updateStudentAcademic(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return studentRepository.findById(id).map(s -> {
            if (updates.containsKey("name")) s.setName((String) updates.get("name"));
            if (updates.containsKey("universityId")) s.setUniversityId((String) updates.get("universityId"));
            if (updates.containsKey("course")) s.setCourse((String) updates.get("course"));
            if (updates.containsKey("branch")) s.setBranch((String) updates.get("branch"));
            if (updates.containsKey("department")) s.setDepartment((String) updates.get("department"));
            if (updates.containsKey("semester")) s.setSemester((String) updates.get("semester"));
            if (updates.containsKey("batch")) s.setBatch((String) updates.get("batch"));
            if (updates.containsKey("program")) s.setProgram((String) updates.get("program"));
            if (updates.containsKey("regulation")) s.setRegulation((String) updates.get("regulation"));

            try {
                if (updates.containsKey("cgpa") && updates.get("cgpa") != null && !updates.get("cgpa").toString().isBlank())
                    s.setCgpa(Double.valueOf(updates.get("cgpa").toString()));
                if (updates.containsKey("attendancePercent") && updates.get("attendancePercent") != null && !updates.get("attendancePercent").toString().isBlank())
                    s.setAttendancePercent(Double.valueOf(updates.get("attendancePercent").toString()));
            } catch (Exception ignored) {}

            studentRepository.save(s);
            return ResponseEntity.ok(Map.of("message", "Institutional Data Synchronized."));
        }).orElse(ResponseEntity.notFound().build());
    }

    private Map<String, Object> toMap(Faculty f) {
        java.util.Map<String, Object> map = new java.util.HashMap<>();
        map.put("facultyId", f.getFacultyId());
        map.put("name", f.getName() != null ? f.getName() : "");
        map.put("universityId", f.getUniversityId() != null ? f.getUniversityId() : "");
        map.put("department", f.getDepartment() != null ? f.getDepartment() : "");
        map.put("designation", f.getDesignation() != null ? f.getDesignation() : "");
        map.put("specialization", f.getSpecialization() != null ? f.getSpecialization() : "");
        map.put("phone", f.getPhone() != null ? f.getPhone() : "");
        map.put("qualification", f.getQualification() != null ? f.getQualification() : "");
        map.put("gender", f.getGender() != null ? f.getGender() : "");
        map.put("experience", f.getExperience() != null ? f.getExperience() : "");
        map.put("cabinNo", f.getCabinNo() != null ? f.getCabinNo() : "");
        map.put("email", f.getUser() != null ? f.getUser().getEmail() : "");
        return map;
    }
}

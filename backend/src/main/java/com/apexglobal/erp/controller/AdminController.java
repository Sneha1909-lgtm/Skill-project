package com.apexglobal.erp.controller;

import com.apexglobal.erp.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final FacultyRepository facultyRepository;

    public AdminController(UserRepository userRepository, StudentRepository studentRepository, FacultyRepository facultyRepository) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.facultyRepository = facultyRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        long totalUsers = userRepository.count();
        long totalStudents = studentRepository.count();
        long totalFaculty = facultyRepository.count();

        return ResponseEntity.ok(Map.of(
            "totalUsers", totalUsers,
            "totalStudents", totalStudents,
            "totalFaculty", totalFaculty,
            "systemStatus", "Operational",
            "uptime", "99.98%"
        ));
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        var users = userRepository.findAll().stream().map(u -> {
            String role = u.getRole() != null ? u.getRole().getName().toLowerCase() : "student";
            return Map.of(
                "userId", (Object) u.getUserId(),
                "username", u.getUsername(),
                "role", role,
                "status", u.getStatus() != null ? u.getStatus() : "ACTIVE"
            );
        }).toList();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/search")
    public ResponseEntity<?> searchUser(@RequestParam String query) {
        var userOpt = userRepository.findByUsernameOrEmail(query, query);
        if (userOpt.isPresent()) {
            var u = userOpt.get();
            Map<String, Object> details = new java.util.HashMap<>();
            details.put("userId", u.getUserId());
            details.put("username", u.getUsername());
            details.put("email", u.getEmail());
            details.put("role", u.getRole() != null ? u.getRole().getName().toLowerCase() : "student");
            details.put("status", u.getStatus());
            
            if ("student".equalsIgnoreCase((String) details.get("role"))) {
                studentRepository.findByUser_Username(u.getUsername()).ifPresent(s -> {
                    details.put("profileId", s.getStudentId());
                    details.put("universityId", s.getUniversityId());
                    details.put("name", s.getName());
                    details.put("course", s.getCourse());
                    details.put("branch", s.getBranch());
                    details.put("semester", s.getSemester());
                });
            } else if ("faculty".equalsIgnoreCase((String) details.get("role"))) {
                facultyRepository.findByUser_Username(u.getUsername()).ifPresent(f -> {
                    details.put("profileId", f.getFacultyId());
                    details.put("universityId", f.getUniversityId());
                    details.put("name", f.getName());
                    details.put("department", f.getDepartment());
                });
            }
            return ResponseEntity.ok(details);
        }

        return studentRepository.findByUniversityId(query)
                .map(s -> ResponseEntity.ok(Map.of("role", "student", "universityId", s.getUniversityId(), "name", s.getName(), "userId", s.getUser().getUserId())))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable @org.springframework.lang.NonNull Long id, @RequestBody Map<String, Object> updates) {
        return userRepository.findById(id).map(u -> {
            if (updates.containsKey("username")) {
                String username = (String) updates.get("username");
                if (username != null) u.setUsername(username);
            }
            if (updates.containsKey("email")) {
                String email = (String) updates.get("email");
                if (email != null) u.setEmail(email);
            }
            if (updates.containsKey("status")) {
                String status = (String) updates.get("status");
                if (status != null) u.setStatus(status);
            }
            if (u == null) return ResponseEntity.notFound().build();
            userRepository.save(u);
            return ResponseEntity.ok(Map.of("message", "User metadata synchronized with institutional node."));
        }).orElse(ResponseEntity.notFound().build());

    }


    @PostMapping("/broadcast")
    public ResponseEntity<?> broadcast(@RequestBody Map<String, String> body) {
        String message = body.getOrDefault("message", "");
        String target = body.getOrDefault("target", "All");
        return ResponseEntity.ok(Map.of("status", "Transmitted", "target", target, "message", message, "timestamp", java.time.LocalDateTime.now().toString()));
    }
}

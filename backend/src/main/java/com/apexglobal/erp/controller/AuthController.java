package com.apexglobal.erp.controller;

import com.apexglobal.erp.repository.RoleRepository;
import com.apexglobal.erp.repository.UserRepository;
import com.apexglobal.erp.repository.StudentRepository;
import com.apexglobal.erp.repository.FacultyRepository;
import com.apexglobal.erp.entity.User;
import com.apexglobal.erp.entity.Role;
import com.apexglobal.erp.entity.Student;
import com.apexglobal.erp.entity.Faculty;
import com.apexglobal.erp.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StudentRepository studentRepository;
    private final FacultyRepository facultyRepository;
    private final PasswordEncoder passwordEncoder;

    public record AuthRequest(String username, String password) {}
    public record RegisterRequest(
        String name, 
        String email, 
        String password, 
        String role, 
        String universityId,
        String branch,
        String batch,
        String semester,
        String phone,
        String course // Used as department for faculty
    ) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.username());
        String token = jwtService.generateToken(userDetails);

        // Extract role from authorities
        String role = userDetails.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .filter(a -> a.startsWith("ROLE_"))
                .map(a -> a.substring(5).toLowerCase())
                .findFirst()
                .orElse("student");

        return ResponseEntity.ok(Map.of(
            "token", token,
            "role", role,
            "username", userDetails.getUsername()
        ));
    }

    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.name()) || userRepository.existsByEmail(request.email())) {
            return ResponseEntity.badRequest().body(Map.of("message", "User already exists."));
        }

        User user = new User();
        user.setUsername(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setStatus("ACTIVE");

        Role role = roleRepository.findByName(request.role().toUpperCase())
                .orElseGet(() -> {
                    Role r = new Role();
                    r.setName(request.role().toUpperCase());
                    return roleRepository.save(r);
                });
        user.setRole(role);

        User savedUser = userRepository.save(user);

        // Auto-create related profile based on Role
        if ("STUDENT".equalsIgnoreCase(savedUser.getRole().getName())) {
            Student student = new Student();
            student.setUser(savedUser);
            student.setName(request.name());
            student.setUniversityId(request.universityId());
            student.setBranch(request.branch());
            student.setBatch(request.batch());
            student.setSemester(request.semester());
            student.setPhone(request.phone());
            student.setCourse(request.course());
            student.setDepartment(request.course() != null ? request.course() : "");
            studentRepository.save(student);
        } else if ("FACULTY".equalsIgnoreCase(savedUser.getRole().getName())) {
            Faculty faculty = new Faculty();
            faculty.setUser(savedUser);
            faculty.setName(request.name());
            faculty.setUniversityId(request.universityId());
            faculty.setPhone(request.phone());
            faculty.setDepartment(request.course() != null ? request.course() : "Unknown");
            facultyRepository.save(faculty);
        }

        return ResponseEntity.ok(Map.of("message", "User Registered Successfully."));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@org.springframework.security.core.annotation.AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) return ResponseEntity.status(401).build();
        String role = userDetails.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .filter(a -> a.startsWith("ROLE_"))
                .map(a -> a.substring(5).toLowerCase())
                .findFirst().orElse("student");
        return ResponseEntity.ok(Map.of("username", userDetails.getUsername(), "role", role));
    }
}

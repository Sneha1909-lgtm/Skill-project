package com.apexglobal.erp.config;

import com.apexglobal.erp.entity.*;
import com.apexglobal.erp.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final StudentRepository studentRepository;
    private final FacultyRepository facultyRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        log.info("=== Data Maintenance: Seeding Warden & Fixing NULLs ===");

        // Pre-requisite: Seed WARDEN User if missing or sync password
        userRepository.findByUsername("warden").ifPresentOrElse(
            existingWarden -> {
                existingWarden.setPassword(passwordEncoder.encode("warden123"));
                userRepository.save(existingWarden);
                log.info("Synchronized existing Warden credentials: warden / warden123");
            },
            () -> {
                Role wardenRole = roleRepository.findByName("WARDEN")
                        .orElseGet(() -> {
                            Role r = new Role();
                            r.setName("WARDEN");
                            return roleRepository.save(r);
                        });
                
                User wardenUser = new User();
                wardenUser.setUsername("warden");
                wardenUser.setEmail("warden@klu.edu.in");
                wardenUser.setPassword(passwordEncoder.encode("warden123"));
                wardenUser.setRole(wardenRole);
                wardenUser.setStatus("ACTIVE");
                userRepository.save(wardenUser);
                log.info("Seeded primary Warden node: warden / warden123");
            }
        );

        // 1. Fix Students
        List<Student> students = studentRepository.findAll();
        for (Student s : students) {
            boolean changed = false;
            if (s.getBranch() == null) { s.setBranch("CSE"); changed = true; }
            if (s.getDepartment() == null) { s.setDepartment("Computer Science & Engineering"); changed = true; }
            if (s.getBatch() == null) { s.setBatch("2024-2028"); changed = true; }
            if (s.getSemester() == null) { s.setSemester("II"); changed = true; }
            if (s.getCourse() == null) { s.setCourse("B.Tech Computer Science"); changed = true; }
            if (s.getProgram() == null) { s.setProgram("B.Tech"); changed = true; }
            if (s.getRegulation() == null) { s.setRegulation("R24"); changed = true; }
            if (s.getCgpa() == null) { s.setCgpa(0.0); changed = true; }
            if (s.getAttendancePercent() == null) { s.setAttendancePercent(0.0); changed = true; }
            if (s.getGender() == null) { s.setGender("Other"); changed = true; }
            if (s.getPhone() == null) { s.setPhone("0000000000"); changed = true; }
            if (s.getHostelStatus() == null) { s.setHostelStatus("Day Scholar"); changed = true; }
            if (s.getNationality() == null) { s.setNationality("Indian"); changed = true; }
            if (s.getAddress() == null) { s.setAddress("N/A"); changed = true; }
            
            if (changed) {
                studentRepository.save(s);
                log.info("Fixed nulls for Student: {}", s.getName());
            }
        }

        // 2. Fix Faculty
        List<Faculty> faculties = facultyRepository.findAll();
        for (Faculty f : faculties) {
            boolean changed = false;
            if (f.getDepartment() == null) { f.setDepartment("CSE"); changed = true; }
            if (f.getDesignation() == null) { f.setDesignation("Assistant Professor"); changed = true; }
            if (f.getSpecialization() == null) { f.setSpecialization("General"); changed = true; }
            if (f.getPhone() == null) { f.setPhone("0000000000"); changed = true; }
            if (f.getQualification() == null) { f.setQualification("PhD"); changed = true; }
            if (f.getGender() == null) { f.setGender("Other"); changed = true; }
            if (f.getExperience() == null) { f.setExperience("0 Years"); changed = true; }
            if (f.getCabinNo() == null) { f.setCabinNo("N/A"); changed = true; }

            if (changed) {
                facultyRepository.save(f);
                log.info("Fixed nulls for Faculty: {}", f.getName());
            }
        }
        
        // 3. Fix Subjects (if faculty is null, though unlikely with FKs)
        List<Subject> subjects = subjectRepository.findAll();
        for (Subject sub : subjects) {
            if (sub.getName() == null) {
                sub.setName("Unknown Subject");
                subjectRepository.save(sub);
            }
        }

        log.info("=== Data Maintenance Complete ===");
    }
}

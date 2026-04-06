package com.apexglobal.erp.controller;

import com.apexglobal.erp.entity.*;
import com.apexglobal.erp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/hostel")
@RequiredArgsConstructor
@SuppressWarnings("null")
@lombok.extern.slf4j.Slf4j
public class HostelController {

    private final StudentRepository studentRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    // ----- LEAVE REQUESTS -----

    @GetMapping("/leaves/me")
    public ResponseEntity<?> getMyLeaves(@AuthenticationPrincipal UserDetails userDetails) {
        return studentRepository.findByUser_Username(userDetails.getUsername())
                .map(s -> {
                    var leaves = leaveRequestRepository.findByStudent(s).stream()
                            .map(this::leaveToMap).toList();
                    return ResponseEntity.ok(leaves);
                }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/leaves/pending")
    public ResponseEntity<?> getPendingLeaves() {
        var leaves = leaveRequestRepository.findByStatus("Pending").stream()
                .map(this::leaveToMap).toList();
        return ResponseEntity.ok(leaves);
    }

    @GetMapping("/leaves/all")
    public ResponseEntity<?> getAllLeaves() {
        var leaves = leaveRequestRepository.findAll().stream()
                .map(this::leaveToMap).toList();
        return ResponseEntity.ok(leaves);
    }

    @PostMapping("/leaves/apply")
    public ResponseEntity<?> applyLeave(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, String> body) {
        return studentRepository.findByUser_Username(userDetails.getUsername())
                .map(s -> {
                    LeaveRequest lr = LeaveRequest.builder()
                            .student(s)
                            .leaveType(body.get("leaveType"))
                            .reason(body.get("reason"))
                            .fromDate(LocalDate.parse(body.get("fromDate")))
                            .toDate(LocalDate.parse(body.get("toDate")))
                            .status("Pending")
                            .appliedOn(LocalDate.now())
                            .build();
                    leaveRequestRepository.save(lr);
                    return ResponseEntity.ok(Map.of("message", "Leave request submitted"));
                }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/leaves/{id}/approve")
    public ResponseEntity<?> approveLeave(
            @PathVariable Long id,
            @RequestParam String action,
            @AuthenticationPrincipal UserDetails userDetails) {
        return leaveRequestRepository.findById(id).map(lr -> {
            lr.setStatus(action.equalsIgnoreCase("approve") ? "Approved" : "Declined");
            lr.setReviewedOn(LocalDate.now());
            userRepository.findByUsername(userDetails.getUsername()).ifPresent(lr::setReviewedBy);
            leaveRequestRepository.save(lr);
            return ResponseEntity.ok(Map.of("message", "Leave " + lr.getStatus()));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ----- COMPLAINTS -----

    @GetMapping("/complaints/me")
    public ResponseEntity<?> getMyComplaints(@AuthenticationPrincipal UserDetails userDetails) {
        return studentRepository.findByUser_Username(userDetails.getUsername())
                .map(s -> {
                    var complaints = complaintRepository.findByStudent(s).stream()
                            .map(this::complaintToMap).toList();
                    return ResponseEntity.ok(complaints);
                }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/complaints/all")
    public ResponseEntity<?> getAllComplaints() {
        var complaints = complaintRepository.findAll().stream()
                .map(this::complaintToMap).toList();
        return ResponseEntity.ok(complaints);
    }

    @PostMapping("/complaints/raise")
    public ResponseEntity<?> raiseComplaint(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, String> body) {
        return studentRepository.findByUser_Username(userDetails.getUsername())
                .map(s -> {
                    Complaint c = Complaint.builder()
                            .student(s)
                            .category(body.get("category"))
                            .issue(body.get("issue"))
                            .status("Pending")
                            .raisedOn(LocalDate.now())
                            .build();
                    complaintRepository.save(c);
                    return ResponseEntity.ok(Map.of("message", "Complaint raised"));
                }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/complaints/{id}/resolve")
    public ResponseEntity<?> resolveComplaint(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return complaintRepository.findById(id).map(c -> {
            c.setStatus("Resolved");
            c.setResolvedOn(LocalDate.now());
            userRepository.findByUsername(userDetails.getUsername()).ifPresent(c::setResolvedBy);
            complaintRepository.save(c);
            return ResponseEntity.ok(Map.of("message", "Complaint resolved"));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ----- WARDEN EXTRAS -----

    @GetMapping("/student/search")
    public ResponseEntity<?> searchStudent(@RequestParam String univId) {
        return studentRepository.findByUniversityId(univId)
                .map(s -> ResponseEntity.ok(studentToMapCompact(s)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/student/{id}/hostel-details")
    public ResponseEntity<?> updateHostelDetails(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        return studentRepository.findById(id).map(s -> {
            if (body.containsKey("hostelStatus")) s.setHostelStatus((String) body.get("hostelStatus"));
            if (body.containsKey("roomNo")) s.setRoomNo((String) body.get("roomNo"));
            if (body.containsKey("hostelName")) s.setHostelName((String) body.get("hostelName"));
            if (body.containsKey("bedNo")) s.setBedNo((String) body.get("bedNo"));
            studentRepository.save(s);
            return ResponseEntity.ok(Map.of("message", "Hostel Details Synced Successfully"));
        }).orElse(ResponseEntity.notFound().build());
    }

    private Map<String, Object> studentToMapCompact(Student s) {
        java.util.Map<String, Object> map = new java.util.HashMap<>();
        map.put("studentId", s.getStudentId());
        map.put("name", s.getName());
        map.put("universityId", s.getUniversityId());
        map.put("hostelStatus", s.getHostelStatus() != null ? s.getHostelStatus() : "Day Scholar");
        map.put("hostelName", s.getHostelName() != null ? s.getHostelName() : "N/A");
        map.put("roomNo", s.getRoomNo() != null ? s.getRoomNo() : "N/A");
        map.put("bedNo", s.getBedNo() != null ? s.getBedNo() : "N/A");
        map.put("isHostler", "Hostler".equalsIgnoreCase(s.getHostelStatus()));
        map.put("phone", s.getPhone() != null ? s.getPhone() : "N/A");
        return map;
    }

    private Map<String, Object> leaveToMap(LeaveRequest lr) {
        return Map.ofEntries(
            Map.entry("id", lr.getId()),
            Map.entry("studentName", lr.getStudent().getName()),
            Map.entry("universityId", lr.getStudent().getUniversityId() != null ? lr.getStudent().getUniversityId() : ""),
            Map.entry("leaveType", lr.getLeaveType() != null ? lr.getLeaveType() : ""),
            Map.entry("reason", lr.getReason() != null ? lr.getReason() : ""),
            Map.entry("fromDate", lr.getFromDate() != null ? lr.getFromDate().toString() : ""),
            Map.entry("toDate", lr.getToDate() != null ? lr.getToDate().toString() : ""),
            Map.entry("status", lr.getStatus() != null ? lr.getStatus() : "Pending"),
            Map.entry("appliedOn", lr.getAppliedOn() != null ? lr.getAppliedOn().toString() : "")
        );
    }

    private Map<String, Object> complaintToMap(Complaint c) {
        return Map.ofEntries(
            Map.entry("id", c.getId()),
            Map.entry("studentName", c.getStudent().getName()),
            Map.entry("universityId", c.getStudent().getUniversityId() != null ? c.getStudent().getUniversityId() : ""),
            Map.entry("category", c.getCategory() != null ? c.getCategory() : ""),
            Map.entry("issue", c.getIssue() != null ? c.getIssue() : ""),
            Map.entry("status", c.getStatus() != null ? c.getStatus() : "Pending"),
            Map.entry("raisedOn", c.getRaisedOn() != null ? c.getRaisedOn().toString() : "")
        );
    }
}

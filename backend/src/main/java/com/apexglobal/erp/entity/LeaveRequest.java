package com.apexglobal.erp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "leave_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    private String leaveType;  // "Local Outpass", "Home Outpass", "Medical Leave"
    private String reason;
    private LocalDate fromDate;
    private LocalDate toDate;

    @Column(length = 20)
    private String status;  // "Pending", "Approved", "Declined"

    private LocalDate appliedOn;
    private LocalDate reviewedOn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewed_by")
    private User reviewedBy;
}

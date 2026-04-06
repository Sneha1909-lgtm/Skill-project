package com.apexglobal.erp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "complaints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    private String category;  // "AC", "Washroom", "Water", "Electricity", "Others"

    @Column(columnDefinition = "TEXT")
    private String issue;

    @Column(length = 20)
    private String status;   // "Pending", "In Progress", "Resolved"

    private LocalDate raisedOn;
    private LocalDate resolvedOn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resolved_by")
    private User resolvedBy;
}

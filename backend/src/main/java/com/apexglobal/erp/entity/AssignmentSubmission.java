package com.apexglobal.erp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "assignment_submissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignmentSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String submissionFileUrl;
    
    @Column(columnDefinition = "TEXT")
    private String studentNote;
    
    private LocalDateTime submittedAt;
    private Double marksObtained;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student submittedBy;

    @PrePersist
    protected void onCreate() {
        submittedAt = LocalDateTime.now();
    }
}

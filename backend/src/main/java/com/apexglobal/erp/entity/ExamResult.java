package com.apexglobal.erp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "exam_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    private String semester;
    private String academicYear;
    private Double cgpa;
    private Integer totalCredits;

    // Store subjects as JSON string: [{code, name, grade, points, credits, promotion}]
    @Column(columnDefinition = "TEXT")
    private String subjectsJson;
}

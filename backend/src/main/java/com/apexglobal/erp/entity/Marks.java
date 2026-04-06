package com.apexglobal.erp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "marks")
@Getter
@Setter
@NoArgsConstructor
public class Marks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long markId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(precision = 5, scale = 2)
    private BigDecimal marksAmount;

    @Column(length = 5)
    private String grade;

    @ManyToOne
    @JoinColumn(name = "evaluated_by")
    private User evaluatedBy; // Points to the Faculty User

    public Marks(Student student, Subject subject) {
        this.student = student;
        this.subject = subject;
    }
}

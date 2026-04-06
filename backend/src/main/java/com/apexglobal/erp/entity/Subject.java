package com.apexglobal.erp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "subjects")
@Getter
@Setter
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subjectId;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "faculty_id")
    private User faculty; // Data Ownership Pointer
}

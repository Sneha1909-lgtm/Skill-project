package com.apexglobal.erp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "permissions")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long permissionId;

    @Column(unique = true, nullable = false)
    private String name; // e.g., "USER_CREATE", "MARKS_UPDATE"
}

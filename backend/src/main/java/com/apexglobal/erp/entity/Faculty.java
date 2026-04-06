package com.apexglobal.erp.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "faculty")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Faculty {
    @Id
    private Long facultyId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "faculty_id")
    private User user;

    @Column(nullable = false)
    private String name;

    private String universityId;
    private String department;
    private String designation;
    private String specialization;
    private String phone;
    private String qualification;
    private LocalDate joiningDate;

    @Column(length = 10)
    private String gender;

    private String experience;
    private String cabinNo;
    // Explicit getters and setters for compatibility if Lombok fails
    public Long getFacultyId() { return facultyId; }
    public void setFacultyId(Long facultyId) { this.facultyId = facultyId; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getUniversityId() { return universityId; }
    public void setUniversityId(String universityId) { this.universityId = universityId; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getQualification() { return qualification; }
    public void setQualification(String qualification) { this.qualification = qualification; }
    public LocalDate getJoiningDate() { return joiningDate; }
    public void setJoiningDate(LocalDate joiningDate) { this.joiningDate = joiningDate; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }
    public String getCabinNo() { return cabinNo; }
    public void setCabinNo(String cabinNo) { this.cabinNo = cabinNo; }
}

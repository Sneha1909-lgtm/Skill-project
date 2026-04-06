package com.apexglobal.erp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {
    @Id
    private Long studentId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "student_id")
    private User user;

    @Column(nullable = false)
    private String name;

    private String universityId;
    private String course;
    private String branch;
    private String department;

    @Column(length = 10)
    private String semester;

    private String batch;

    private Double cgpa;

    private Double attendancePercent;

    @Column(length = 10)
    private String gender;

    private LocalDate dob;
    private String phone;
    private String bloodGroup;
    private String height;
    private String weight;
    private String nationality;
    private String religion;
    private String motherTongue;
    private String placeOfBirth;

    @Column(length = 20)
    private String hostelStatus; // "Hostler" or "Day Scholar"

    private String roomNo;
    private String hostelName;
    private String bedNo;
    private String regulation;
    private String program;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(columnDefinition = "LONGTEXT")
    private String profileImage;
    // Explicit getters and setters for compatibility if Lombok fails
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getUniversityId() { return universityId; }
    public void setUniversityId(String universityId) { this.universityId = universityId; }
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
    public String getBatch() { return batch; }
    public void setBatch(String batch) { this.batch = batch; }
    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }
    public Double getAttendancePercent() { return attendancePercent; }
    public void setAttendancePercent(Double attendancePercent) { this.attendancePercent = attendancePercent; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }
    public String getHeight() { return height; }
    public void setHeight(String height) { this.height = height; }
    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }
    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }
    public String getReligion() { return religion; }
    public void setReligion(String religion) { this.religion = religion; }
    public String getMotherTongue() { return motherTongue; }
    public void setMotherTongue(String motherTongue) { this.motherTongue = motherTongue; }
    public String getPlaceOfBirth() { return placeOfBirth; }
    public void setPlaceOfBirth(String placeOfBirth) { this.placeOfBirth = placeOfBirth; }
    public String getHostelStatus() { return hostelStatus; }
    public void setHostelStatus(String hostelStatus) { this.hostelStatus = hostelStatus; }
    public String getRoomNo() { return roomNo; }
    public void setRoomNo(String roomNo) { this.roomNo = roomNo; }
    public String getHostelName() { return hostelName; }
    public void setHostelName(String hostelName) { this.hostelName = hostelName; }
    public String getBedNo() { return bedNo; }
    public void setBedNo(String bedNo) { this.bedNo = bedNo; }
    public String getRegulation() { return regulation; }
    public void setRegulation(String regulation) { this.regulation = regulation; }
    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }
}

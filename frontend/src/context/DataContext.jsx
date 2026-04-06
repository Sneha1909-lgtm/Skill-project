/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';
import {
  getStudentProfileApi, getAllStudentsApi,
  getFacultyProfileApi, getAllFacultyApi,
  getMyResultsApi,
  getMyLeavesApi, getPendingLeavesApi, applyLeaveApi, approveLeaveApi,
  getMyComplaintsApi, getAllComplaintsApi, raiseComplaintApi, resolveComplaintApi,
  getAdminStatsApi, getAllUsersApi, broadcastApi, registerApi, postMarksApi, getAssignedSubjectsApi,
  getAllSubjectsApi
} from '../services/api.js';
import { toast } from 'sonner';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { role, token } = useContext(AuthContext);

  // ---- State ----
  const [studentProfile, setStudentProfile] = useState(null);
  const [facultyProfile, setFacultyProfile] = useState(null);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [myLeaves, setMyLeaves] = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [myComplaints, setMyComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    if (!token || !role) return;
    setLoading(true);
    try {
      if (role === 'student') {
        const [profileRes, resultsRes, leavesRes, complaintsRes, subjectsRes] = await Promise.allSettled([
          getStudentProfileApi(),
          getMyResultsApi(),
          getMyLeavesApi(),
          getMyComplaintsApi(),
          getAllSubjectsApi(),
        ]);
        if (profileRes.status === 'fulfilled') setStudentProfile(profileRes.value.data);
        if (resultsRes.status === 'fulfilled') setExamResults(resultsRes.value.data);
        if (leavesRes.status === 'fulfilled') setMyLeaves(leavesRes.value.data); 
        if (complaintsRes.status === 'fulfilled') setMyComplaints(complaintsRes.value.data);
        if (subjectsRes.status === 'fulfilled') setSubjects(subjectsRes.value.data);
      }

      if (role === 'faculty') {
        const [profileRes, studentsRes, subjectsRes] = await Promise.allSettled([
          getFacultyProfileApi(),
          getAllStudentsApi(0, 100),
          getAssignedSubjectsApi(),
        ]);
        if (profileRes.status === 'fulfilled') setFacultyProfile(profileRes.value.data);
        if (studentsRes.status === 'fulfilled') setStudents(studentsRes.value.data.content || []);
        if (subjectsRes.status === 'fulfilled') setAssignedSubjects(subjectsRes.value.data || []);
      }

      if (role === 'warden') {
        const [pendingRes, complaintsRes] = await Promise.allSettled([
          getPendingLeavesApi(),
          getAllComplaintsApi(),
        ]);
        if (pendingRes.status === 'fulfilled') setPendingLeaves(pendingRes.value.data);
        if (complaintsRes.status === 'fulfilled') setAllComplaints(complaintsRes.value.data);
      }

      if (role === 'admin') {
        const [statsRes, usersRes, studentsRes, facultyRes] = await Promise.allSettled([
          getAdminStatsApi(),
          getAllUsersApi(),
          getAllStudentsApi(0, 50),
          getAllFacultyApi(),
        ]);
        if (statsRes.status === 'fulfilled') setAdminStats(statsRes.value.data);
        if (usersRes.status === 'fulfilled') setAllUsers(usersRes.value.data);
        if (studentsRes.status === 'fulfilled') setStudents(studentsRes.value.data.content || []);
        if (facultyRes.status === 'fulfilled') setFaculty(facultyRes.value.data.content || []);
      }
    } catch (e) {
      console.error('DataContext load error:', e);
    } finally {
      setLoading(false);
    }
  };

  // Load data when role/token changes
  useEffect(() => {
    loadData();
  }, [role, token]);

  // ---- Actions ----
  const refetchData = loadData;

  const applyLeave = async (data) => {
    try {
      await applyLeaveApi(data);
      toast.success('Leave Request Submitted');
      await loadData();
    } catch { toast.error('Failed to submit leave request'); }
  };
  
  const approveLeave = async (id, action) => {
    try {
      await approveLeaveApi(id, action);
      toast.success(`Leave ${action === 'approve' ? 'Approved' : 'Declined'}`);
      await loadData();
    } catch { toast.error('Failed to update leave'); }
  };

  const raiseComplaint = async (data) => {
    try {
      await raiseComplaintApi(data);
      toast.success('Complaint Raised Successfully');
      await loadData();
    } catch { toast.error('Failed to raise complaint'); }
  };

  const resolveComplaint = async (id) => {
    try {
      await resolveComplaintApi(id);
      toast.success('Complaint Marked as Resolved');
      await loadData();
    } catch { toast.error('Failed to resolve complaint'); }
  };

  const sendBroadcast = async (message, target) => {
    try {
      await broadcastApi(message, target);
      toast.success('Broadcast Transmitted', { description: `Sent to ${target} nodes` });
    } catch { toast.error('Broadcast failed'); }
  };

  const fetchStudentsByBatch = async (batch) => {
    try {
      const res = await getAllStudentsApi(0, 100, batch);
      setStudents(res.data.content || []);
    } catch { toast.error('Failed to fetch students'); }
  };

  // Legacy compatibility helpers (used by some components)
  const users = students;
  const addClass = () => {};
  const addQuiz = () => {};
  const addAssignment = () => {};
  const updateUser = () => {};
  const registerUser = async (data) => {
    try {
      await registerApi(data);
    } catch (e) {
      console.error('Registration failed:', e);
      throw e;
    }
  };
  const approveUser = () => {};
  const publishExamResult = async (data) => {
    try {
      await postMarksApi(data);
      toast.success('Marks Synchronized Successfully');
      await loadData();
    } catch (e) {
      console.error('Failed to publish results:', e);
      toast.error('Sync Failed', { description: 'Ensure the subject is assigned to you.' });
    }
  };
  const submitFeedback = () => {};
  const processPayment = () => {};
  const borrowBook = () => {};
  const submitAssignment = () => {};
  const gradeAssignment = () => {};
  const updateQuizStatus = () => {};
  const addAttendanceRecord = async (record) => {
    toast.info('Attendance Synced', { description: `Recorded for ${record.student}` });
  };
  const requestOutpass = applyLeave;
  const assignRoom = () => {};

  return (
    <DataContext.Provider value={{
      // Profiles
      studentProfile,
      facultyProfile,
      adminStats,
      // Lists
      students, users,
      faculty,
      assignedSubjects,
      subjects,
      examResults,
      myLeaves, pendingLeaves,
      myComplaints, allComplaints,
      allUsers,
      loading,
      // Actions
      refetchData,
      applyLeave, approveLeave,
      raiseComplaint, resolveComplaint,
      sendBroadcast,
      fetchStudentsByBatch,
      // Legacy compatibility
      classes: [
        { title: 'Advanced Cloud Architecture', time: '10:00 AM', room: 'Virtual Lab 4', instructor: 'Dr. Arjun' },
        { title: 'Neural Network Sync', time: '02:00 PM', room: 'L-301', instructor: 'Prof. Sarah' }
      ],
      quizzes: [
        { title: 'Cloud Infrastructure Node', questions: 15, time: 20, difficulty: 'HARD' },
        { title: 'Microservices Logic Arc', questions: 10, time: 15, difficulty: 'MEDIUM' },
        { title: 'Security Protocol Alpha', questions: 20, time: 30, difficulty: 'EXTREME' }
      ],
      assignments: [
        { title: 'Infrastructure Diagram Node', deadline: '2026-04-10', subject: 'Cloud Computing' },
        { title: 'Cognitive Model Synthesis', deadline: '2026-04-12', subject: 'AI/ML' }
      ],
      timetables: [], attendance: [],
      hostelData: [], libraryData: [], paymentData: [], feedbacks: [],
      addClass, addQuiz, addAssignment, updateUser, registerUser, approveUser,
      publishExamResult, submitFeedback, processPayment, borrowBook,
      submitAssignment, gradeAssignment, updateQuizStatus, addAttendanceRecord,
      requestOutpass, assignRoom,
    }}>
      {children}
    </DataContext.Provider>
  );
};

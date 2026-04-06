/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const initialClasses = [
    { id: 1, title: 'Data Structures Advanced', instructor: 'Dr. John Smith', time: 'Today 2:00 PM', students: 45, department: 'CS', color: '#38bdf8', batch: '2024-2028' },
    { id: 2, title: 'Web Development Workshop', instructor: 'Ms. Sarah Johnson', time: 'Tomorrow 10:00 AM', students: 32, department: 'IT', color: '#2dd4bf', batch: '2023-2027' },
];

const initialQuizzes = [
    { id: 1, title: 'Basic Quiz', subject: 'General', questions: 2, time: 5, status: 'Available', difficulty: 'Easy', score: 0, batch: 'All' },
];

const initialUsers = [];

const initialAssignments = [
    { id: 1, title: 'React Basics', description: 'Build a simple component', deadline: '2026-05-01', submissions: [], batch: '2024-2028' }
];

const initialExamResults = [
    { student: 'student@test.com', sem: 'Even Sem', year: '2024-2025', cgpa: 7.86, totalCredits: 65.5, subjects: [
        { code: '22UC0021', name: 'SOCIAL IMMERSIVE LEARNING-1', grade: 'O', point: 10, credits: 1, promotion: 'P' },
        { code: '23EC1202', name: 'DIGITAL DESIGN AND COMPUTER ARCHITECTURE', grade: 'A', point: 8, credits: 4, promotion: 'P' },
        { code: '23EC1203', name: 'BASIC ELECTRICAL AND ELECTRONIC CIRCUITS', grade: 'B', point: 6, credits: 2, promotion: 'P' },
        { code: '23FL3058', name: 'JAPANESE LANGUAGE', grade: 'A+', point: 9, credits: 3, promotion: 'P' },
        { code: '23ME1103', name: 'DESIGN TOOL WORKSHOP', grade: 'O', point: 10, credits: 2, promotion: 'P' },
        { code: '23MT1001', name: 'LINEAR ALGEBRA & CALCULUS', grade: 'A', point: 8, credits: 4, promotion: 'P' }
    ]}
];

const initialTimetables = [
    {
        batch: '2024-2028',
        schedule: {
            'Tue': ['-', '-', '24MT2019-L', '24MT2019-L', '24CS2255-P', '24CS2255-P', '-', '24CS2204-L', '24CS2203-S', '24CS2203-S', '-'],
            'Wed': ['24CC3010-S', '24CC3010-S', '24CS2203-P', '24CS2203-P', '24CS2101-P', '24CS2101-P', '24SDCS02-S', '24SDCS02-S', '24SP2114-S', '24SP2114-S', '-'],
            'Thu': ['-', '-', '24SDCS02-S', '24SDCS02-S', '24MT2019-T', '24MT2019-T', '24CS2203-L', '24CS2203-L', '24CS2204-S', '24CS2204-S', '-'],
            'Fri': ['-', '-', '24CS2255-L', '24CS2255-L', '24CS2204-P', '24CS2204-P', '-', '24CS2101-L', '-', '-', '-']
        }
    }
];

const initialAttendance = [
    { student: 'student@test.com', year: '2025-2026', sem: 'Even Sem', present: 45, total: 50, percentage: 90 }
];

const initialHostel = [
    { student: 'student@test.com', room: 'A-402', enrolled: true, outpassRequests: [], powerMeter: '1240 kWh' }
];

const initialLibrary = [
    { id: '1', title: 'Clean Architecture', author: 'Robert C. Martin', available: true, borrowedBy: null },
    { id: '2', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', available: false, borrowedBy: 'student@test.com' }
];

const initialPayments = [
    { student: 'student@test.com', type: 'Tuition Fee - Even Sem', amount: 150000, status: 'Paid', date: '10-02-2026' },
    { student: 'student@test.com', type: 'Hostel Maintenance', amount: 25000, status: 'Pending', date: '-' }
];

const initialFeedbacks = [];

export const DataProvider = ({ children }) => {
  const [classes, setClasses] = useState(() => JSON.parse(localStorage.getItem('erp_classes')) || initialClasses);
  const [quizzes, setQuizzes] = useState(() => JSON.parse(localStorage.getItem('erp_quizzes')) || initialQuizzes);
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('erp_users')) || initialUsers);
  const [assignments, setAssignments] = useState(() => JSON.parse(localStorage.getItem('erp_assignments')) || initialAssignments);
  
  const [examResults, setExamResults] = useState(() => JSON.parse(localStorage.getItem('erp_exams')) || initialExamResults);
  const [timetables, setTimetables] = useState(() => JSON.parse(localStorage.getItem('erp_timetables')) || initialTimetables);
  const [attendance, setAttendance] = useState(() => JSON.parse(localStorage.getItem('erp_attendance')) || initialAttendance);
  const [hostelData, setHostelData] = useState(() => JSON.parse(localStorage.getItem('erp_hostel')) || initialHostel);
  
  const [libraryData, setLibraryData] = useState(() => JSON.parse(localStorage.getItem('erp_library')) || initialLibrary);
  const [paymentData, setPaymentData] = useState(() => JSON.parse(localStorage.getItem('erp_payments')) || initialPayments);
  const [feedbacks, setFeedbacks] = useState(() => JSON.parse(localStorage.getItem('erp_feedbacks')) || initialFeedbacks);

  // Save to local storage on changes
  useEffect(() => { localStorage.setItem('erp_classes', JSON.stringify(classes)); }, [classes]);
  useEffect(() => { localStorage.setItem('erp_quizzes', JSON.stringify(quizzes)); }, [quizzes]);
  useEffect(() => { localStorage.setItem('erp_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('erp_assignments', JSON.stringify(assignments)); }, [assignments]);
  useEffect(() => { localStorage.setItem('erp_exams', JSON.stringify(examResults)); }, [examResults]);
  useEffect(() => { localStorage.setItem('erp_timetables', JSON.stringify(timetables)); }, [timetables]);
  useEffect(() => { localStorage.setItem('erp_attendance', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('erp_hostel', JSON.stringify(hostelData)); }, [hostelData]);
  useEffect(() => { localStorage.setItem('erp_library', JSON.stringify(libraryData)); }, [libraryData]);
  useEffect(() => { localStorage.setItem('erp_payments', JSON.stringify(paymentData)); }, [paymentData]);
  useEffect(() => { localStorage.setItem('erp_feedbacks', JSON.stringify(feedbacks)); }, [feedbacks]);

  // Actions
  const addClass = (newClass) => setClasses(prev => [...prev, { ...newClass, id: Date.now() }]);
  const addQuiz = (newQuiz) => setQuizzes(prev => [...prev, { ...newQuiz, id: Date.now() }]);
  const addAssignment = (assignment) => setAssignments(prev => [...prev, { ...assignment, id: Date.now(), submissions: [] }]);
  
  const updateUser = (updatedUser) => setUsers(prev => prev.map(u => u.email === updatedUser.email ? updatedUser : u));
  const registerUser = (newUser) => setUsers(prev => [...prev, { ...newUser, status: 'pending' }]);
  
  // Admin Auto Generation ID Block
  const approveUser = (email, selectedBatch) => {
      setUsers(prev => {
          const target = prev.find(u => u.email === email);
          if (!target) return prev;
          
          let prefix = "00";
          if (target.role === 'student' && selectedBatch) {
              prefix = selectedBatch.substring(2, 4); // "2024-2028" -> "24"
          } else if (target.role === 'faculty') {
              prefix = "FC";
          } else if (target.role === 'warden') {
              prefix = "WD";
          }

          let maxSeq = 0;
          prev.forEach(u => {
              if (u.universityId && u.universityId.startsWith(prefix) && u.role === target.role) {
                  const seqStr = u.universityId.substring(2);
                  const seq = parseInt(seqStr, 10);
                  if (!isNaN(seq) && seq > maxSeq) {
                      maxSeq = seq;
                  }
              }
          });

          const getNextId = () => {
              if (target.role === 'student') {
                  const padded = (maxSeq + 1).toString().padStart(5, '0');
                  return `${prefix}${padded}`;
              } else {
                  return `${prefix}${(maxSeq + 1).toString().padStart(3, '0')}`;
              }
          };

          const newId = getNextId();
          return prev.map(u => u.email === email ? { ...u, status: 'active', batch: selectedBatch, universityId: newId } : u);
      });
  };

  const publishExamResult = (record) => {
      // record contains {student, sem, year, totalCredits, cgpa, subjects[]}
      setExamResults(prev => {
          const filtered = prev.filter(e => !(e.student === record.student && e.sem === record.sem && e.year === record.year));
          return [...filtered, record];
      });
  };

  const submitFeedback = (fb) => {
      setFeedbacks(prev => [...prev, { ...fb, id: Date.now() }]);
  };

  const processPayment = (email, type) => {
      setPaymentData(prev => prev.map(p => {
          if (p.student === email && p.type === type) {
              return { ...p, status: 'Paid', date: new Date().toLocaleDateString() };
          }
          return p;
      }));
  };

  const borrowBook = (bookId, email) => {
      setLibraryData(prev => prev.map(b => b.id === bookId ? { ...b, available: false, borrowedBy: email } : b));
  };

  const submitAssignment = (assignmentId, studentEmail, content) => {
      setAssignments(prev => prev.map(a => {
          if(a.id === assignmentId) {
              const submits = a.submissions.filter(s => s.student !== studentEmail);
              return { ...a, submissions: [...submits, { student: studentEmail, content, grade: null }] };
          }
          return a;
      }));
  };

  const gradeAssignment = (assignmentId, studentEmail, grade) => {
      setAssignments(prev => prev.map(a => {
          if(a.id === assignmentId) {
              return {
                  ...a,
                  submissions: a.submissions.map(s => s.student === studentEmail ? { ...s, grade } : s)
              };
          }
          return a;
      }));
  };

  const updateQuizStatus = (quizId, status, score = 0) => {
      setQuizzes(prev => prev.map(q => q.id === quizId ? { ...q, status, score } : q));
  };
  
  const addAttendanceRecord = (record) => {
      setAttendance(prev => {
          const exists = prev.find(a => a.student === record.student && a.year === record.year && a.sem === record.sem);
          if (exists) {
              return prev.map(a => {
                  if (a.student === record.student && a.year === record.year && a.sem === record.sem) {
                      const newTotal = a.total + 1;
                      const newPresent = record.isPresent ? a.present + 1 : a.present;
                      return { ...a, total: newTotal, present: newPresent, percentage: Math.round((newPresent/newTotal)*100) };
                  }
                  return a;
              });
          }
          const presentCount = record.isPresent ? 1 : 0;
          return [...prev, { student: record.student, year: record.year, sem: record.sem, present: presentCount, total: 1, percentage: record.isPresent ? 100 : 0 }];
      });
  };

  const requestOutpass = (studentEmail, purpose, dates) => {
      setHostelData(prev => prev.map(h => {
          if (h.student === studentEmail) {
              return { ...h, outpassRequests: [...h.outpassRequests, { id: Date.now(), purpose, dates, status: 'Pending' }] };
          }
          return h;
      }));
  };

  const assignRoom = (email, roomLabel) => {
      setHostelData(prev => {
          const exists = prev.find(h => h.student === email);
          if (exists) {
               return prev.map(h => h.student === email ? { ...h, room: roomLabel, enrolled: true } : h);
          } else {
               return [...prev, { student: email, room: roomLabel, enrolled: true, outpassRequests: [], powerMeter: '0 kWh' }];
          }
      });
  };

  return (
    <DataContext.Provider value={{ 
        classes, addClass,
        quizzes, addQuiz, updateQuizStatus,
        users, updateUser, registerUser, approveUser,
        assignments, addAssignment, submitAssignment, gradeAssignment,
        examResults, timetables, publishExamResult,
        attendance, addAttendanceRecord,
        hostelData, requestOutpass, assignRoom,
        libraryData, borrowBook,
        paymentData, processPayment,
        feedbacks, submitFeedback
    }}>
      {children}
    </DataContext.Provider>
  );
};

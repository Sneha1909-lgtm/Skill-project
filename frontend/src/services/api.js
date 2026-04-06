import axios from 'axios';

const API_BASE = 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Attach JWT to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('klu_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('klu_token');
      localStorage.removeItem('klu_role');
      localStorage.removeItem('klu_username');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ---- Auth ----
export const loginApi = (username, password) =>
  api.post('/api/auth/login', { username, password });

export const registerApi = (data) =>
  api.post('/api/auth/register', data);

export const getMeApi = () => api.get('/api/auth/me');

// ---- Student ----
export const getStudentProfileApi = () => api.get('/api/students/me');
export const getAllStudentsApi = (page = 0, size = 50, batch = '') =>
  api.get(`/api/students/all?page=${page}&size=${size}${batch ? `&batch=${batch}` : ''}`);

export const uploadProfileImageApi = (image) => api.post('/api/students/upload-image', { image });
export const updateStudentProfileApi = (data) => api.put('/api/students/me', data);
export const getMyResultsApi = () => api.get('/api/students/results');
export const getMyLeavesApi = () => api.get('/api/hostel/leaves/me');
export const applyLeaveApi = (data) => api.post('/api/hostel/leaves/apply', data);
export const getMyComplaintsApi = () => api.get('/api/complaints/me');
export const raiseComplaintApi = (data) => api.post('/api/complaints/raise', data);

// ---- Admin Governance ----
export const getAdminStatsApi = () => api.get('/api/admin/stats');
export const getAllUsersApi = () => api.get('/api/admin/users');
export const adminSearchUserApi = (query) => api.get(`/api/admin/users/search?query=${query}`);
export const adminUpdateUserApi = (id, data) => api.put(`/api/admin/users/${id}`, data);
export const broadcastApi = (message, target) =>
  api.post('/api/admin/broadcast', { message, target });
export const getAllComplaintsApi = () => api.get('/api/admin/complaints');
export const resolveComplaintApi = (id) => api.put(`/api/admin/complaints/${id}/resolve`);
export const getAllFacultyApi = () => api.get('/api/admin/faculty');

// ---- Faculty & Student Management ----
export const getFacultyProfileApi = () => api.get('/api/faculty/me');
export const getAssignedSubjectsApi = () => api.get('/api/faculty/subjects');
export const postMarksApi = (data) => api.post('/api/faculty/marks', data);
export const facultySubmitAttendanceApi = (data) => api.post('/api/faculty/attendance', data);
export const facultySearchStudentsApi = (query) => api.get(`/api/faculty/student/search?query=${query}`);
export const facultyUpdateStudentAcademicApi = (id, data) => api.put(`/api/faculty/student/${id}/academic-details`, data);

// ---- Warden & Residential Hub ----
export const getPendingLeavesApi = () => api.get('/api/hostel/leaves/pending');
export const wardenSearchRoomApi = (query) => api.get(`/api/hostel/student/search?univId=${query}`);
export const wardenUpdateRoomApi = (id, data) => api.put(`/api/hostel/student/${id}/hostel-details`, data);
export const getAllLeavesApi = () => api.get('/api/hostel/leaves/all');
export const approveLeaveApi = (id, action) => api.put(`/api/hostel/leaves/${id}/approve?action=${action}`);

// ---- Subjects ----
export const getAllSubjectsApi = () => api.get('/api/subjects/all');

export default api;

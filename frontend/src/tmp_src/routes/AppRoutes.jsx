import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import MainLayout from '../components/layout/MainLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import StudentPage from '../pages/StudentPage.jsx';
import FacultyPage from '../pages/FacultyPage.jsx';
import AdminPage from '../pages/AdminPage.jsx';
import QuizPage from '../pages/QuizPage.jsx';
import LiveClassPage from '../pages/LiveClassPage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import WardenPage from '../pages/WardenPage.jsx';
import ProtectedRoute from '../components/auth/ProtectedRoute.jsx';

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Public Routes - No Sidebar */}
      <Route path="/" element={<><Navbar /><HomePage /></>} />
      <Route path="/login" element={<><Navbar /><LoginPage /></>} />
      <Route path="/register" element={<><Navbar /><RegisterPage /></>} />
      
      {/* Protected Routes - Wrapped in MainLayout */}
      <Route path="/dashboard" element={<ProtectedRoute><MainLayout><DashboardPage /></MainLayout></ProtectedRoute>} />
      <Route path="/student" element={<ProtectedRoute allowedRoles={['student', 'admin']}><MainLayout><StudentPage /></MainLayout></ProtectedRoute>} />
      <Route path="/faculty" element={<ProtectedRoute allowedRoles={['faculty', 'admin']}><MainLayout><FacultyPage /></MainLayout></ProtectedRoute>} />
      <Route path="/warden" element={<ProtectedRoute allowedRoles={['warden', 'admin']}><MainLayout><WardenPage /></MainLayout></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><MainLayout><AdminPage /></MainLayout></ProtectedRoute>} />
      <Route path="/quiz" element={<ProtectedRoute><MainLayout><QuizPage /></MainLayout></ProtectedRoute>} />
      <Route path="/liveclass" element={<ProtectedRoute><MainLayout><LiveClassPage /></MainLayout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;

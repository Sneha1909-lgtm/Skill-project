import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute.jsx';
import MainLayout from '../components/layout/MainLayout.jsx';

// Lazy load institutional nodes for performance
const HomePage = lazy(() => import('../pages/HomePage.jsx'));
const LoginPage = lazy(() => import('../pages/LoginPage.jsx'));
const RegisterPage = lazy(() => import('../pages/RegisterPage.jsx'));
const DashboardPage = lazy(() => import('../pages/DashboardPage.jsx'));
const AdminPage = lazy(() => import('../pages/AdminPage.jsx'));
const FacultyPage = lazy(() => import('../pages/FacultyPage.jsx'));
const WardenPage = lazy(() => import('../pages/WardenPage.jsx'));
const LMSPage = lazy(() => import('../pages/LMSPage.jsx'));
const AcademicPage = lazy(() => import('../pages/AcademicPage.jsx'));
const HostelPage = lazy(() => import('../pages/HostelPage.jsx'));
const ProfilePage = lazy(() => import('../pages/ProfilePage.jsx'));

// Loading Nodal Overlay
const LoadingOverlay = () => (
  <div className="min-h-screen bg-secondary-dark flex items-center justify-center p-8">
     <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Institutional Endpoints */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Distributed Control Clusters */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPage />
            </ProtectedRoute>
          } />

          <Route path="/faculty" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <FacultyPage />
            </ProtectedRoute>
          } />

          <Route path="/warden" element={
            <ProtectedRoute allowedRoles={['warden']}>
              <WardenPage />
            </ProtectedRoute>
          } />

          <Route path="/lms" element={
            <ProtectedRoute>
              <LMSPage />
            </ProtectedRoute>
          } />

          <Route path="/academic" element={
            <ProtectedRoute>
              <AcademicPage />
            </ProtectedRoute>
          } />

          <Route path="/hostel" element={
            <ProtectedRoute>
              <HostelPage />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
        </Route>

        {/* Catch-all Nodal Redirection */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

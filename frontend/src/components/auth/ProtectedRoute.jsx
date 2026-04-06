import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useContext(AuthContext);
  const location = useLocation();

  // Wait for session restore before deciding
  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Synchronizing Node...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to correct home for the role
    const roleHome = { admin: '/admin', faculty: '/faculty', warden: '/warden', student: '/student' };
    return <Navigate to={roleHome[role] || '/student'} replace />;
  }

  return children;
};

export default ProtectedRoute;

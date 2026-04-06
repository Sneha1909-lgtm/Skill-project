import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  // Assume auth check
  const isAuthenticated = true; // replace with actual check
  const userRole = 'student'; // replace with actual role

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
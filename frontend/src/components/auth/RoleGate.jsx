import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

/**
 * RoleGate Component
 * Conditionally renders children based on the user's role.
 * 
 * @param {string[]} allowedRoles - Array of roles that can access the content.
 * @param {React.ReactNode} fallback - Optional fallback content for unauthorized users.
 */
const RoleGate = ({ allowedRoles, children, fallback = null }) => {
    const { role } = useContext(AuthContext);

    if (allowedRoles.includes(role)) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};

export default RoleGate;

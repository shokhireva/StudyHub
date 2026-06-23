import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authStorage } from '../auth/authStorage';

interface RequireAuthProps {
    allowedRoles?: ('Teacher' | 'Student')[];
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
    const user = authStorage.getUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
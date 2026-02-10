import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role = 'ADMIN' }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && user.role !== role) {
        // Optional: Redirect to unauthorized page or home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

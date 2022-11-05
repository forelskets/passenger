import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ isAuth, children }) => {
    return localStorage.getItem('token') ? children : <Navigate to="/" />;
};

export const PublicRoute = ({ isAuth, children }) => {
    return !localStorage.getItem('token') ? children : <Navigate to="/" />;
};

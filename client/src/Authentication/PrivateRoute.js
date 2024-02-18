import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element: Element }) => {
  const { authToken } = useAuth();
  let location = useLocation();

  return authToken ? Element : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;

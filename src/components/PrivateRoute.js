import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, redirect }) => {
  const authToken = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        const currentTime = Date.now() / 1000; // current time in seconds

        if (decodedToken.exp < currentTime) {
          // Token expired, clear the token and redirect to login
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      } catch (error) {
        console.error('Invalid token or decoding error');
        localStorage.removeItem('authToken'); // Clear invalid token
        navigate('/login');
      }
    }
  }, [authToken, navigate]);

  return authToken ? (
    children
  ) : (
    <Navigate
      to={`/login?redirect=${encodeURIComponent(redirect || location.pathname)}`}
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
  redirect: PropTypes.string,
};

export default PrivateRoute;

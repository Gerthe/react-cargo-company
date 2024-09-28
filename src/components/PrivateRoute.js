import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const PrivateRoute = ({ children, redirect }) => {
  const authenticate = localStorage.getItem('token');
  const location = useLocation();
  return authenticate ? (
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

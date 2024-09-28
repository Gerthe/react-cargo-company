import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import LandingPage from './pages/LandingPage/LandingPage';
import DashboardLayout from './pages/DashboardLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage/AdminPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';

//TODO: private routes for dashboard and admin

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'admin',
        element: (
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

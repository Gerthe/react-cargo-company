import React from 'react';
import { useRouteError } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="error-page">
      <div className="error-container">
        <h1 className="error-code">404</h1>
        <p className="error-message">Ой! Похоже такой страницы не существует</p>
        <a href="/" className="error-button">
          На главную
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;

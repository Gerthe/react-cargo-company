import React from 'react';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Login Page</h1>
      <Form>
        <Form.Item>
          <label>Phone</label>
          <input type="text" />
        </Form.Item>
        <Form.Item>
          <label>Password</label>
          <input type="password" />
        </Form.Item>

        <button type="submit" onClick={navigate('/dashboard')}>
          Login
        </button>
      </Form>
    </div>
  );
};

export default LoginPage;

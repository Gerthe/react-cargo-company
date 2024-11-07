import React, { useEffect, useState } from 'react';
import { Form, Input, Alert, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/auth.api';
import { ERROR_MESSAGES } from '../constants/errors';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formError, setFormError] = useState();
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // current time in seconds

        if (decodedToken.exp > currentTime) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Invalid token or decoding error');
      }
    }
  }, [navigate]);

  const handleSubmit = async (values) => {
    setIsFormLoading(true);
    try {
      const response = await authApi.login(values.phone, values.password);
      const { token, user } = response;

      if (token) {
        localStorage.setItem('token', response.token);

        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/dashboard');
        }
      }
    } catch (err) {
      const errorMessage =
        ERROR_MESSAGES[err.response.data.message] || err.response.data.message;
      setFormError(errorMessage);
      console.error(err);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div
      style={{
        margin: '0 auto',
        width: 'fit-content',
      }}
    >
      <h1
        style={{
          color: 'var(--main)',
          fontSize: '1.6rem',
          marginBottom: 20,
          marginTop: 40,
        }}
      >
        Войти в аккаунт
      </h1>
      {formError && (
        <Alert
          message="Произошла ошибка"
          description={formError}
          type="error"
          style={{ marginBottom: 20 }}
        />
      )}
      <Form
        onFinish={handleSubmit}
        form={form}
        style={{ maxWidth: 500 }}
        name="login"
      >
        <Form.Item label="Телефон" name="phone" rules={[{ required: true }]}>
          <Input addonBefore="+7" maxLength={10} />
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isFormLoading}
            style={{
              backgroundColor: 'var(--secondary)',
              color: 'var(--main)',
            }}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
      <div>
        <a href="/forgot-password">Забыли пароль?</a>
      </div>

      <div
        style={{
          marginTop: 60,
        }}
      >
        <h2>Присоединяйтесь к Pekin Cargo 888!</h2>
        <p>Зарегистрируйтесь, чтобы легко отслеживать свои отправления</p>
        <Button
          type="primary"
          variant="filled"
          onClick={() => navigate('/register')}
        >
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;

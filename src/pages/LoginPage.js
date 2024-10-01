import React, { useState } from 'react';
import { Form, Input, Alert } from 'antd';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/auth.api';
import { ERROR_MESSAGES } from '../constants/errors';

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formError, setFormError] = useState();
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsFormLoading(true);
    try {
      const response = await authApi.login(values.phone, values.password);
      const token = response.token;

      if (token) {
        localStorage.setItem('token', response.token);
        const user = await authApi.getUserById(response.user.id);

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
    <div>
      <h1>Войти в аккаунт</h1>
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
          <Button type="primary" htmlType="submit" disabled={isFormLoading}>
            Войти
          </Button>
        </Form.Item>
      </Form>

      <div>
        Нет аккаунта? <a href="/register">Зарегистрироваться</a>
      </div>
    </div>
  );
};

export default LoginPage;

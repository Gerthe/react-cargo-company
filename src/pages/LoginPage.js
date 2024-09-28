import React from 'react';
import { Form, Input } from 'antd';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/auth.api';

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
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
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Войти в аккаунт</h1>
      <Form
        onFinish={handleSubmit}
        form={form}
        style={{ maxWidth: 500 }}
        name="login"
      >
        <Form.Item label="Телефон" name="phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
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

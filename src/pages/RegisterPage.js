import React from 'react';
import { Form, Input, Result, message } from 'antd';
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigator = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [isRegistered, setIsRegistered] = React.useState(false);

  const goToLoginPage = () => {
    navigator('/login');
  };

  const handleSubmit = async (values) => {
    try {
      const register = await axios.post(
        'http://localhost:3000/api/users/register',
        values
      );
      if (register) {
        setIsRegistered(true);
      }
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: err.response.data.message,
      });
    }
  };

  return (
    <div>
      {contextHolder}
      <h1>Регистрация нового пользователя</h1>

      {!isRegistered && (
        <>
          <p>Зарегитрируйтесь чтобы отслеживать статус ваших посылок</p>
          <Form onFinish={handleSubmit} form={form} style={{ maxWidth: 500 }}>
            <Form.Item label="Имя" name="name" rules={[{ required: true }]}>
              <Input maxLength={20} minLength={2} />
            </Form.Item>
            <Form.Item
              label="Телефон"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input addonBefore="+7" maxLength={10} minLength={10} />
            </Form.Item>
            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>

          <div>
            Уже есть аккаунт? <a href="/login">Войти</a>
          </div>
        </>
      )}

      {isRegistered && (
        <Result
          status="success"
          title="Вы успешно зарегистрировались!"
          subTitle="Вы можете войти в свой аккаунт и отслеживать статус ваших посылок."
          extra={[
            <Button type="primary" key="console" onClick={goToLoginPage}>
              Войти
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default RegisterPage;

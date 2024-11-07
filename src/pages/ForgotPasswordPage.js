import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Input, message, Result } from 'antd';
import authApi from '../api/auth.api';
import { ERROR_MESSAGES } from '../constants/errors';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigator = useNavigate();
  const resetFormRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const [phone, setPhone] = useState();

  // Проверка на оставшееся время блокировки при загрузке компонента
  useEffect(() => {
    const lastSent = localStorage.getItem('lastSentTime');
    if (lastSent) {
      const timeElapsed = Date.now() - Number(lastSent);
      if (timeElapsed < 30 * 60 * 1000) {
        setIsDisabled(true);
        setTimeLeft(30 * 60 * 1000 - timeElapsed);

        // Таймер для обновления оставшегося времени
        const interval = setInterval(() => {
          const newTimeLeft = Math.max(
            0,
            30 * 60 * 1000 - (Date.now() - Number(lastSent))
          );
          setTimeLeft(newTimeLeft);
          if (newTimeLeft <= 0) {
            clearInterval(interval);
            setIsDisabled(false);
            localStorage.removeItem('lastSentTime');
          }
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, []);

  const handleSendCode = async (values) => {
    if (isDisabled) {
      messageApi.open({
        type: 'error',
        content: 'Повторная отправка кода возможна через 30 минут',
      });
      return;
    }

    try {
      await authApi.requestPasswordReset(values.phone);

      setPhone(values.phone);
      setIsCodeSent(true);
      localStorage.setItem('lastSentTime', Date.now());
      setIsDisabled(true);
      setTimeLeft(30 * 60 * 1000);

      messageApi.open({
        type: 'success',
        content: 'Код восстановления отправлен в приложение Telegram',
      });
    } catch (error) {
      const errorCode = error.response?.data?.message;
      const errorMessage = ERROR_MESSAGES[errorCode] || 'Произошла ошибка';

      messageApi.open({
        type: 'error',
        content: errorMessage,
      });
    }
  };

  const handlePasswordReset = async (values) => {
    try {
      const response = await authApi.resetPassword(
        values.phone,
        values.resetCode,
        values.password
      );
      messageApi.open({
        type: 'success',
        content: response.message,
      });
      setIsPasswordReset(true);
    } catch (error) {
      const errorCode = error.response?.data?.error;
      const errorMessage = ERROR_MESSAGES[errorCode] || 'Произошла ошибка';

      messageApi.open({
        type: 'error',
        content: errorMessage,
      });
    }
  };

  const goToLoginPage = () => {
    navigator('/login');
  };

  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: 500,
      }}
    >
      {contextHolder}

      <h1>Забыли пароль?</h1>

      {!isCodeSent && !isPasswordReset && (
        <>
          <div style={{ maxWidth: 500, margin: '20px 0' }}>
            Введите номер телефона, который вы использовали при регистрации, и
            мы отправим вам код для восстановления пароля в приложение{' '}
            <b>Telegram</b>.
          </div>

          <Form
            name="forgot-password"
            style={{ maxWidth: 500 }}
            onFinish={handleSendCode}
          >
            <Form.Item
              label="Телефон"
              name="phone"
              rules={[
                { required: true, message: 'Пожалуйста, введите ваш телефон' },
              ]}
            >
              <Input addonBefore="+7" maxLength={10} />
            </Form.Item>

            <Button type="primary" htmlType="submit" disabled={isDisabled}>
              {isDisabled
                ? `Повторная отправка через ${Math.floor(timeLeft / 60000)} мин ${Math.floor((timeLeft % 60000) / 1000)} сек`
                : 'Отправить код'}
            </Button>
          </Form>

          <Button
            type="link"
            style={{ margin: '20px 0' }}
            onClick={() => setIsCodeSent(true)}
          >
            У меня уже есть код
          </Button>
        </>
      )}

      {isCodeSent && !isPasswordReset && (
        <>
          <div style={{ maxWidth: 500, margin: '20px 0' }}>
            Мы отправили вам код восстановления на указанный номер телефона.
            Введите его в поле ниже, чтобы продолжить.
          </div>

          <Form
            name="reset-password"
            style={{ maxWidth: 500 }}
            onFinish={handlePasswordReset}
            initialValues={{
              phone,
            }}
            ref={resetFormRef}
          >
            <Form.Item
              label="Телефон"
              name="phone"
              rules={[
                { required: true, message: 'Пожалуйста, введите ваш телефон' },
              ]}
            >
              <Input addonBefore="+7" maxLength={10} />
            </Form.Item>

            <Form.Item
              label="Код из SMS"
              name="resetCode"
              rules={[
                { required: true, message: 'Пожалуйста, введите код из SMS' },
              ]}
            >
              <Input.OTP length={6} />
            </Form.Item>

            <Form.Item
              label="Новый пароль"
              name="password"
              rules={[
                { required: true, message: 'Пожалуйста, введите новый пароль' },
                {
                  min: 6,
                  message: 'Пароль должен содержать не менее 6 символов',
                },
              ]}
            >
              <Input.Password minLength={6} />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Сбросить пароль
            </Button>
          </Form>

          <Button
            type="link"
            style={{ margin: '20px 0' }}
            onClick={() => setIsCodeSent(false)}
          >
            Отправить код повторно
          </Button>
        </>
      )}

      {isPasswordReset && (
        <Result
          status="success"
          title="Вы успешно обновили пароль!"
          subTitle="Вы можете войти в свой аккаунт с новым паролем."
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
export default ForgotPasswordPage;

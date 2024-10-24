import React, { useState } from 'react';
import { Alert, Form, Input } from 'antd';
import shipmentsApi from '../../api/shipments.api';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { ERROR_MESSAGES } from '../../constants/errors';
import { LeftOutlined } from '@ant-design/icons';

const AddShipmentPage = () => {
  const [form] = Form.useForm();
  const [formError, setFormError] = useState();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setIsFormLoading(true);
      const response = await shipmentsApi.createShipment(values);
      if (response) {
        navigate('/dashboard');
      }
    } catch (err) {
      const localisedError =
        ERROR_MESSAGES[err.response.data.message] || err.response.data.message;
      setFormError(localisedError);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div>
      <a
        style={{
          marginTop: 40,
          marginBottom: 20,
          color: 'var(--main)',
          display: 'inline-block',
        }}
        href={'/dashboard'}
      >
        <LeftOutlined /> Назад
      </a>

      <h1>Добавить новый код отслеживания</h1>
      <p
        style={{
          marginBottom: 40,
        }}
      >
        Введите код отслеживания выданный вам продавцом, чтобы мы могли
        отслеживать статус вашей посылки.{' '}
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          label="Код отслеживания"
          name="trackingCode"
          minLength={7}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите код отслеживания!',
            },
            {
              min: 7,
              message: 'Код отслеживания должен содержать минимум 7 символов',
            },
          ]}
        >
          <Input maxLength={30} />
        </Form.Item>
        <Form.Item
          label="Описание"
          name="description"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите описание!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        {formError && (
          <Alert
            message="Произошла ошибка"
            description={formError}
            type="error"
            style={{ marginBottom: 20 }}
          />
        )}

        <Form.Item
          style={{
            marginTop: 40,
          }}
        >
          <Button disabled={isFormLoading} type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddShipmentPage;

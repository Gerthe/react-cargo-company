import React, { useState } from 'react';
import { Alert, Form, Input } from 'antd';
import shipmentsApi from '../../api/shipments.api';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

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
      setFormError(err.response.data.message);
      console.error(err);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div>
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
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите код отслеживания!',
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

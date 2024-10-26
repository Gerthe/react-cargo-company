import React from 'react';
import { DatePicker, Form, Input, message, Modal } from 'antd';
import shipmentsApi from '../../api/shipments.api';
import dayjs from 'dayjs';
import { WAREHOUSES } from '../../constants';
import PropTypes from 'prop-types';

const AddOrphanShipmentModal = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleCreate = async (values) => {
    try {
      const response = await shipmentsApi.createShipment({
        ...values,
        arrivalDate: dayjs(values.arrivalDate).format('YYYY-MM-DD HH:mm:ss'),
        userId: null,
        createdBy: 'admin',
        claimed: 0,
      });
      if (response) {
        messageApi.open({
          type: 'success',
          content:
            'Отслеживание "' + values.trackingCode + '" успешно добавлено!',
        });
        onCreate();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        title="Добавить новое отслеживание"
        okText="Добавить"
        cancelText="Отмена"
        okButtonProps={{
          autoFocus: true,
          htmlType: 'submit',
        }}
        onCancel={onCancel}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{
              deliverTo: WAREHOUSES[0].location,
              arrivalDate: dayjs(),
            }}
            clearOnDestroy
            onFinish={(values) => handleCreate(values)}
          >
            {dom}
          </Form>
        )}
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
          label="Дата прибытия на склад в Китае"
          name="arrivalDate"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите склад!',
            },
          ]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          label="Склад"
          name="deliverTo"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите склад!',
            },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item label="Комментарий" name="adminNote">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Modal>
    </>
  );
};

AddOrphanShipmentModal.propTypes = {
  open: PropTypes.bool,
  onCreate: PropTypes.func,
  onCancel: PropTypes.func,
};

export default AddOrphanShipmentModal;

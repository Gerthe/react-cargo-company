import React, { useEffect, useState } from 'react';
import { Modal, Select, Descriptions, Skeleton } from 'antd';
import { SHIPMENT_STATUSES_MAP } from '../../constants';
import dayjs from 'dayjs';
import shipmentsApi from '../../api/shipments.api';
import PropTypes from 'prop-types';

const ShipmentModal = ({ open, onOk, onCancel, shipmentId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState();

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const getShipmentStatusOptions = () => {
    return Object.keys(SHIPMENT_STATUSES_MAP).map((status) => ({
      value: status,
      label: SHIPMENT_STATUSES_MAP[status].title,
    }));
  };

  const getItems = (data) => {
    return [
      {
        key: '1',
        label: 'Код отслеживания',
        children: data.trackingCode,
      },
      {
        key: '2',
        label: 'Статус',
        children: (
          <Select
            defaultValue={data.status}
            style={{ width: 250 }}
            onChange={handleStatusChange}
            options={getShipmentStatusOptions()}
          />
        ),
      },
      {
        key: '3',
        label: 'Имя',
        children: data.userName,
      },
      {
        key: '4',
        label: 'Телефон',
        children: '+7' + data.userPhone,
      },
      {
        key: '5',
        label: 'Дата создания',
        children: dayjs(data.createdAt).format('DD.MM.YYYY HH:mm'),
      },
      {
        key: '6',
        label: 'Дата обновления',
        children: dayjs(data.updatedAt).format('DD.MM.YYYY HH:mm'),
      },
      {
        key: '7',
        label: 'Описание',
        children: data.description || 'Отсутствует',
      },
    ];
  };

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        setIsLoading(true);

        const response = await shipmentsApi.getShipmentById(shipmentId);

        if (response.id) {
          setItems(getItems(response));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (shipmentId) {
      fetchShipment();
    }
  }, [shipmentId, getItems]);

  const handleOk = async () => {
    try {
      const response = await shipmentsApi.updateShipmentStatus(
        shipmentId,
        status
      );

      if (response) {
        onOk();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setStatus('');
    }
  };

  return (
    <Modal
      width={'80%'}
      title="Информация о посылке"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      centered
      okButtonProps={{
        disabled: !status,
      }}
      okText="Сохранить"
    >
      {isLoading ? (
        <Skeleton />
      ) : (
        <Descriptions
          layout="vertical"
          items={items}
          bordered={true}
          column={2}
        />
      )}
    </Modal>
  );
};

ShipmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  shipmentId: PropTypes.string.isRequired,
};

export default ShipmentModal;

import React, { useEffect, useState } from 'react';
import { Modal, Select, Descriptions, Skeleton } from 'antd';
import {
  DEFAULT_LOCATION,
  SHIPMENT_STATUSES_MAP,
  SHIPMENT_STATUSES_ORDERED,
  SHIPMENT_STATUSES_ORDERED_DEFAULT,
} from '../../constants';
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

  const getShipmentStatusOptions = (shipment) => {
    if (shipment.deliverTo === DEFAULT_LOCATION) {
      return SHIPMENT_STATUSES_ORDERED_DEFAULT.map((status) => ({
        value: status,
        label: SHIPMENT_STATUSES_MAP[status].title,
      }));
    } else {
      return SHIPMENT_STATUSES_ORDERED.map((status) => ({
        value: status,
        label: SHIPMENT_STATUSES_MAP[status].title,
      }));
    }
  };

  useEffect(() => {
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
              options={getShipmentStatusOptions(data)}
            />
          ),
        },
        {
          key: '3',
          label: 'Город',
          children: data.deliverTo,
        },
        {
          key: '4',
          label: 'Имя',
          children: data.userName,
        },
        {
          key: '5',
          label: 'Телефон',
          children: '+7' + data.userPhone,
        },
        {
          key: '6',
          label: 'Дата создания',
          children: dayjs(data.createdAt).format('DD.MM.YYYY HH:mm'),
        },
        {
          key: '7',
          label: 'Дата обновления',
          children: dayjs(data.updatedAt).format('DD.MM.YYYY HH:mm'),
        },
        {
          key: '8',
          label: 'Описание',
          children: data.description || 'Отсутствует',
        },
      ];
    };

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
  }, [shipmentId]);

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
          column={{ xs: 1, sm: 1, md: 2 }}
        />
      )}
    </Modal>
  );
};

ShipmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  shipmentId: PropTypes.number.isRequired,
};

export default ShipmentModal;

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
          key: 'trackingCode',
          label: 'Код отслеживания',
          children: <strong>{data.trackingCode}</strong>,
        },
        {
          key: 'status',
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
          key: 'deliverTo',
          label: 'Город',
          children: data.deliverTo,
        },
        {
          key: 'userName',
          label: 'Имя',
          children: data.userName ? (
            data.userName
          ) : (
            <span style={{ color: '#900' }}>Не указано</span>
          ),
        },
        {
          key: 'userPhone',
          label: 'Телефон',
          children: data.userPhone ? (
            '+7' + data.userPhone
          ) : (
            <span style={{ color: '#900' }}>Не указан</span>
          ),
        },
        {
          key: 'description',
          label: 'Описание от клиента',
          children: data.description || 'Отсутствует',
        },
        {
          key: 'createdAt',
          label: 'Дата создания',
          children: dayjs(data.createdAt).format('DD.MM.YYYY HH:mm'),
        },
        {
          key: 'updatedAt',
          label: 'Дата обновления',
          children: dayjs(data.updatedAt).format('DD.MM.YYYY HH:mm'),
        },
        {
          key: 'arrivalDate',
          label: 'Дата прибытия на склад в Китае',
          children: data.arrivalDate
            ? dayjs(data.arrivalDate).format('DD.MM.YYYY HH:mm')
            : 'Не указана',
        },
        {
          key: 'adminNote',
          label: 'Комментарий',
          children: data.adminNote || 'Отсутствует',
          span: 2,
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
          column={{ xs: 1, sm: 1, md: 3 }}
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

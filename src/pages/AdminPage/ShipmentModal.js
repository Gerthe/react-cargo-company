import React, { useEffect, useState } from 'react';
import { Modal, Select, Skeleton, Input, message } from 'antd';
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
  const [isLoading, setIsLoading] = useState(true);
  const [shipment, setShipment] = useState();
  const [status, setStatus] = useState();
  const [adminNote, setAdminNote] = useState();
  const [messageApi, contextHolder] = message.useMessage();

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
    const fetchShipment = async () => {
      try {
        setIsLoading(true);

        const response = await shipmentsApi.getShipmentById(shipmentId);

        if (response.id) {
          setShipment(response);
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
      const response = await shipmentsApi.updateShipment(shipment.id, {
        status: status || shipment.status,
        adminNote: adminNote || shipment.adminNote,
      });

      if (response) {
        messageApi.open({
          type: 'success',
          content: 'Информация о посылке успешно обновлена!',
        });

        setShipment(response);
        setAdminNote('');
        setStatus('');

        onOk();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        width={'80%'}
        title="Информация о посылке"
        open={open}
        onOk={handleOk}
        onCancel={onCancel}
        centered
        destroyOnClose
        okText="Сохранить"
        okButtonProps={{
          autoFocus: true,
          htmlType: 'submit',
          disabled: !status && !adminNote,
        }}
      >
        {isLoading ? (
          <Skeleton />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              gridTemplateRows: 'repeat(auto-fill, 32px)',
            }}
          >
            <div>Код отслеживания</div>
            <div style={{ color: 'var(--main)' }}>
              <strong>{shipment.trackingCode}</strong>
            </div>
            <div>Статус</div>
            <div>
              <Select
                style={{ width: '100%' }}
                options={getShipmentStatusOptions(shipment)}
                onChange={(value) => setStatus(value)}
                defaultValue={shipment.status}
              />
            </div>
            <div>Город</div>
            <div>{shipment.deliverTo}</div>
            <div>Имя</div>
            <div>
              {shipment.userName ? (
                shipment.userName
              ) : (
                <span style={{ color: '#900' }}>Не указано</span>
              )}
            </div>
            <div>Телефон</div>
            <div>
              {shipment.userPhone ? (
                '+7' + shipment.userPhone
              ) : (
                <span style={{ color: '#900' }}>Не указан</span>
              )}
            </div>
            <div>Описание от клиента</div>
            <div>{shipment.description || 'Отсутствует'}</div>
            <div>Дата создания</div>
            <div>{dayjs(shipment.createdAt).format('DD.MM.YYYY HH:mm')}</div>
            <div>Дата обновления</div>
            <div>{dayjs(shipment.updatedAt).format('DD.MM.YYYY HH:mm')}</div>
            <div>Дата прибытия на склад в Китае</div>
            <div>
              {shipment.arrivalDate
                ? dayjs(shipment.arrivalDate).format('DD.MM.YYYY HH:mm')
                : 'Не указана'}
            </div>
            <div>Комментарий</div>
            <div>
              <Input.TextArea
                title="Комментарий"
                maxLength={200}
                rows={4}
                defaultValue={shipment.adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

ShipmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  shipmentId: PropTypes.number.isRequired,
};

export default ShipmentModal;

import React, { useEffect, useState } from 'react';
import shipmentsApi from '../../api/shipments.api';
import dayjs from 'dayjs';
import { CheckCircleFilled } from '@ant-design/icons';

const ArchiveShipmentsList = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);

  //TODO: padination?

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setLoading(true);
        const data = await shipmentsApi.getShipmentWithStatus('delivered');
        setShipments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  return (
    <div>
      {loading && <p>Загрузка...</p>}

      {shipments?.map((shipment) => (
        <div
          key={shipment.trackingCode}
          style={{
            width: '100%',
            padding: 20,
            backgroundColor: 'var(--light)',
            marginBottom: 20,
            borderRadius: 5,
            border: '1px solid #f0f0f0',
          }}
        >
          <span style={{ color: 'var(--secondary)' }}>
            <CheckCircleFilled
              style={{
                color: 'var(--secondary)',
                marginRight: 5,
              }}
            />
            <strong>
              ДОСТАВЛЕН {dayjs(shipment.updatedAt).format('DD.MM.YYYY HH:mm')}
            </strong>
          </span>
          <div
            style={{
              textTransform: 'uppercase',
              fontSize: 24,
              color: 'var(--main)',
              fontWeight: 'bold',
            }}
          >
            {shipment.trackingCode}
          </div>

          <div
            style={{
              fontSize: 20,
              color: '#a1a1b2',
              marginTop: 10,
            }}
          >
            {shipment.description}
          </div>
        </div>
      ))}

      {!shipments.length && (
        <div>
          <p>У Вас ещё нет полученных отправлений</p>
        </div>
      )}
    </div>
  );
};

export default ArchiveShipmentsList;

import React, { useEffect, useState } from 'react';
import shipmentsApi from '../../api/shipments.api';
import { Card } from 'antd';

const ArchiveShipmentsList = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <Card
          key={shipment.trackingCode}
          title={
            <div>
              <h2>{shipment.trackingCode}</h2>
              <p>{shipment.description}</p>
            </div>
          }
          style={{
            width: '100%',
          }}
        >
          {shipment.updatedAt}
        </Card>
      ))}

      {!shipments.length && (
        <div>
          <p>У Вас пока нет полученных отправлений</p>
        </div>
      )}
    </div>
  );
};

export default ArchiveShipmentsList;

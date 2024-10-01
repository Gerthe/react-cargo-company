import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import ShipmentStatusTimeline from '../../components/ShipmentStatusTimeline';
import shipmentsApi from '../../api/shipments.api';
import Button from '../../components/Button';

const ShipmentsList = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filteredShipments = shipments.filter((shipment) => {
    return shipment.trackingCode.includes(searchValue);
  });

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setLoading(true);
        const data = await shipmentsApi.getShipmentWithStatus('active');
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

      {!!shipments.length && (
        <div
          style={{
            marginBottom: 20,
          }}
        >
          <Input.Search
            placeholder="Поиск по номеру отправления"
            onChange={handleSearch}
          />
        </div>
      )}

      {filteredShipments?.map((shipment) => (
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
          <ShipmentStatusTimeline shipmentStatus={shipment.status} />
        </Card>
      ))}

      {!shipments.length && (
        <div>
          <p>Нет отправлений</p>
          <Button type="primary">Добавить отправление</Button>
        </div>
      )}
    </div>
  );
};

export default ShipmentsList;

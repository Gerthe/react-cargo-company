import React, { useEffect, useState } from 'react';
import { Card, Input, Button } from 'antd';
import ShipmentStatusTimeline from '../../components/ShipmentStatusTimeline';
import shipmentsApi from '../../api/shipments.api';
import { DeleteOutlined } from '@ant-design/icons';
import { SHIPMENT_STATUSES } from '../../constants';

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

  const handleDelete = async (id) => {
    try {
      await shipmentsApi.deleteShipment(id);
      setShipments((prev) => prev.filter((shipment) => shipment.id !== id));
    } catch (err) {
      console.error(err);
    }
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
          extra={
            shipment.status === SHIPMENT_STATUSES.CREATED ? (
              <Button
                shape="circle"
                variant="filled"
                onClick={() => handleDelete(shipment.id)}
                icon={<DeleteOutlined />}
              />
            ) : (
              ''
            )
          }
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

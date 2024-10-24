import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Empty } from 'antd';
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
            placeholder="Поиск по номеру отслеживания"
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
              <div
                style={{
                  textTransform: 'uppercase',
                  fontSize: 20,
                  marginTop: 20,
                  color: 'var(--main)',
                  fontWeight: 'bold',
                }}
              >
                {shipment.trackingCode}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: '#a1a1b2',
                  padding: '10px 0 15px',
                }}
              >
                {shipment.description}
              </div>
            </div>
          }
          style={{
            width: '100%',
            marginBottom: 20,
          }}
        >
          <ShipmentStatusTimeline shipment={shipment} />
        </Card>
      ))}

      {!shipments.length && (
        <Empty
          description={
            <>
              <p>Нет отправлений</p>
              <Button type="primary">Добавить номер отслеживания</Button>
            </>
          }
        />
      )}
    </div>
  );
};

export default ShipmentsList;

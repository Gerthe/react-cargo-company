import React from 'react';
import { Card } from 'antd';
import ShipmentStatusTimeline from '../components/ShipmentStatusTimeline';

const DashboardPage = () => {
  const shipments = [
    {
      trackingCode: '123456',
      description: 'This is a test shipment',
      status: 'IN_TRANSIT',
    },
    {
      trackingCode: '123457',
      description: 'This is a test shipment',
      status: 'DELIVERED',
    },
    {
      trackingCode: '123458',
      description: 'This is a test shipment',
      status: 'CHINA_WAREHOUSE',
    },
  ];
  return (
    <div>
      <h1>Dashboard Page</h1>
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
            width: 300,
          }}
        >
          <ShipmentStatusTimeline shipmentStatus={shipment.status} />
        </Card>
      ))}
    </div>
  );
};

export default DashboardPage;

import React from 'react';
import { Card } from 'antd';
import ShipmentStatusTimeline from '../components/ShipmentStatusTimeline';
import { SHIPMENT_STATUSES } from '../constants';

const getRandomShipmentStatus = () => {
  const statuses = Object.values(SHIPMENT_STATUSES);
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomTrackingCode = () => {
  return Math.random().toString(36).substring(7).toUpperCase();
};

const getRandomShipmentArray = (count) => {
  const shipments = [];
  for (let i = 0; i < count; i++) {
    shipments.push({
      trackingCode: getRandomTrackingCode(),
      description: 'This is a test shipment',
      status: getRandomShipmentStatus(),
    });
  }
  return shipments;
};

const DashboardPage = () => {
  const shipments = getRandomShipmentArray(5);
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

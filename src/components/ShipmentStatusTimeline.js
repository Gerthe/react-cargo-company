import React from 'react';
import { Timeline } from 'antd';
import PropTypes from 'prop-types';

const ShipmentStatusTimeline = ({ shipmentStatus }) => {
  return (
    <div>
      <h3>{shipmentStatus}</h3>
      <Timeline
        items={[
          {
            color: 'green',
            children: 'Получен на складе в Китае',
          },
          {
            color: 'green',
            children: 'Отправлен со склада в Китае',
          },
          {
            children: 'Транзит',
          },
          {
            color: 'gray',
            children: 'На складе в Алматы',
          },
          {
            color: 'gray',
            children: 'Доставлен',
          },
        ]}
      />
    </div>
  );
};

ShipmentStatusTimeline.propTypes = {
  shipmentStatus: PropTypes.string.isRequired,
};

export default ShipmentStatusTimeline;

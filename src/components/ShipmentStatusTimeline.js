import React from 'react';
import { Timeline } from 'antd';
import PropTypes from 'prop-types';
import { SHIPMENT_STATUSES, SHIPMENT_STATUSES_ORDERED } from '../constants';

const ShipmentStatusTimeline = ({ shipmentStatus }) => {
  const getStatusColor = (status) => {
    if (
      SHIPMENT_STATUSES_ORDERED.indexOf(shipmentStatus) >=
      SHIPMENT_STATUSES_ORDERED.indexOf(status)
    ) {
      if (
        status === SHIPMENT_STATUSES.TRANSIT &&
        shipmentStatus === SHIPMENT_STATUSES.TRANSIT
      ) {
        return 'blue';
      }
      return 'green';
    }
    return 'gray';
  };

  const timelineStatusesItems = SHIPMENT_STATUSES_ORDERED.map((status) => {
    return {
      children: status,
      color: getStatusColor(status),
    };
  });

  return (
    <div>
      <h3>{shipmentStatus}</h3>
      <Timeline items={timelineStatusesItems} />
    </div>
  );
};

ShipmentStatusTimeline.propTypes = {
  shipmentStatus: PropTypes.string.isRequired,
};

export default ShipmentStatusTimeline;

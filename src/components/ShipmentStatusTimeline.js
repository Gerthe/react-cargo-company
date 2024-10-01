import React from 'react';
import { Timeline } from 'antd';
import PropTypes from 'prop-types';
import { SHIPMENT_STATUSES, SHIPMENT_STATUSES_ORDERED } from '../constants';

const shipmentStatusMessages = {
  [SHIPMENT_STATUSES.CREATED]: 'Создано',
  [SHIPMENT_STATUSES.CHINA_WAREHOUSE]: 'На складе в Китае',
  [SHIPMENT_STATUSES.CHINA_WAREHOUSE_SENT]: 'Отправлено из Китая',
  [SHIPMENT_STATUSES.TRANSIT]: 'В пути',
  [SHIPMENT_STATUSES.ALMATY_WAREHOUSE]: 'На складе в Алматы',
  [SHIPMENT_STATUSES.DELIVERED]: 'Доставлено',
};

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
      children: shipmentStatusMessages[status],
      color: getStatusColor(status),
    };
  });

  return <Timeline items={timelineStatusesItems} />;
};

ShipmentStatusTimeline.propTypes = {
  shipmentStatus: PropTypes.string.isRequired,
};

export default ShipmentStatusTimeline;

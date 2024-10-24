import React from 'react';
import { Timeline } from 'antd';
import PropTypes from 'prop-types';
import {
  DEFAULT_LOCATION,
  SHIPMENT_STATUSES,
  SHIPMENT_STATUSES_ORDERED,
} from '../constants';

const ShipmentStatusTimeline = ({ shipment }) => {
  const { status: shipmentStatus, deliverTo } = shipment;

  const shipmentStatusMessages = {
    [SHIPMENT_STATUSES.CREATED]: 'Создано',
    [SHIPMENT_STATUSES.CHINA_WAREHOUSE]: 'На складе в Китае',
    [SHIPMENT_STATUSES.CHINA_WAREHOUSE_SENT]: 'Отправлено из Китая',
    [SHIPMENT_STATUSES.ALMATY_WAREHOUSE]: 'На складе в Алматы',
    [SHIPMENT_STATUSES.TRANSIT]: 'В пути',
    [SHIPMENT_STATUSES.LOCAL_WAREHOUSE]: 'На местном складе ' + deliverTo,
    [SHIPMENT_STATUSES.DELIVERED]: 'Доставлено',
  };

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
    if (
      status === SHIPMENT_STATUSES.LOCAL_WAREHOUSE &&
      deliverTo === DEFAULT_LOCATION
    ) {
      return null;
    }

    if (
      status === SHIPMENT_STATUSES.TRANSIT &&
      deliverTo === DEFAULT_LOCATION
    ) {
      return null;
    }

    return {
      children: shipmentStatusMessages[status],
      color: getStatusColor(status),
    };
  }).filter((item) => item !== null);

  return <Timeline items={timelineStatusesItems} />;
};

ShipmentStatusTimeline.propTypes = {
  shipment: PropTypes.object.isRequired,
};

export default ShipmentStatusTimeline;

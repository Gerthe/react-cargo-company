import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';
import shipmentApi from '../../api/shipment.api';

const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'trackingNumber', dataIndex: 'tracking_code' },
  { title: 'status', dataIndex: 'status' },
  {
    title: 'createdAt',
    dataIndex: 'created_at',
    render: (date) => dayjs(date).format('DD/MM/YYYY'),
  },
  {
    title: 'updatedAt',
    dataIndex: 'updated_at',
    render: (date) => dayjs(date).format('DD/MM/YYYY'),
  },
  { title: 'userId', dataIndex: 'user_id' },
];

const ShipmentsTable = () => {
  const [shipments, setShipments] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setLoading(true);
        const response = await shipmentApi.getShipments();
        setShipments(response);
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
      <Table
        columns={columns}
        dataSource={shipments}
        loading={loading}
        rowKey="tracking_code"
      />
    </div>
  );
};

export default ShipmentsTable;

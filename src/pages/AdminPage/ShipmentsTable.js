import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

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
        const response = await axios.get('http://localhost:3000/api/shipments');
        setShipments(response.data);
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

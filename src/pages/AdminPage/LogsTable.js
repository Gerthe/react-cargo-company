import React from 'react';
import dayjs from 'dayjs';
import { Table } from 'antd';

const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Shipment', dataIndex: 'shipment_id' },
  { title: 'Previous status', dataIndex: 'previous_status' },
  { title: 'New status', dataIndex: 'new_status' },
  {
    title: 'Date',
    dataIndex: 'created_at',
    render: (date) => dayjs(date).format('DD/MM/YYYY'),
  },
];

const LogsTable = () => {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/logs');
        const data = await response.json();
        setLogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <Table
        dataSource={logs}
        loading={loading}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

export default LogsTable;

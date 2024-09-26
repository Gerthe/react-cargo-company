import React from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';

const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'phone', dataIndex: 'phone' },
  { title: 'role', dataIndex: 'role' },
  {
    title: 'createdAt',
    dataIndex: 'created_at',
    render: (date) => dayjs(date).format('DD/MM/YYYY'),
  },
];

const UsersTable = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="phone"
      />
    </div>
  );
};

export default UsersTable;

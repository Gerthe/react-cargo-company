import React from 'react';
import { Tabs } from 'antd';
import UsersTable from './UsersTable';
import ShipmentsTable from './ShipmentsTable';
import LogsTable from './LogsTable';

const AdminPage = () => {
  const tabItems = [
    {
      key: 'shipments',
      label: 'Shipments',
      children: <ShipmentsTable />,
    },
    {
      key: 'users',
      label: 'Users',
      children: <UsersTable />,
    },
    {
      key: 'logs',
      label: 'Logs',
      children: <LogsTable />,
    },
  ];

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Admins can manage users and shipments</p>
      <Tabs defaultActiveKey="shipments" items={tabItems} />
    </div>
  );
};

export default AdminPage;

import React from 'react';
import { Tabs } from 'antd';
import UsersTable from './UsersTable';
import ShipmentsTable from './ShipmentsTable';
import LogsTable from './LogsTable';
import { useSearchParams } from 'react-router-dom';

const AdminPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = React.useState(
    searchParams.get('tab') || 'shipments'
  );

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

  const handleTabChange = (key) => {
    setSearchParams({ tab: key });
    setActiveTab(key);
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Admins can manage users and shipments</p>
      <Tabs activeKey={activeTab} onChange={handleTabChange} items={tabItems} />
    </div>
  );
};

export default AdminPage;

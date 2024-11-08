import React, { useEffect } from 'react';
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

  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'shipments');
  }, [searchParams]);

  const tabItems = [
    {
      key: 'shipments',
      label: 'Посылки',
      children: <ShipmentsTable />,
    },
    {
      key: 'users',
      label: 'Пользователи',
      children: <UsersTable />,
    },
    {
      key: 'logs',
      label: 'Логи',
      children: <LogsTable />,
    },
  ];

  const handleTabChange = (key) => {
    setSearchParams({ tab: key });
    setActiveTab(key);
  };

  return (
    <div>
      <h1>Панель управления</h1>
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={tabItems}
        destroyInactiveTabPane
      />
    </div>
  );
};

export default AdminPage;

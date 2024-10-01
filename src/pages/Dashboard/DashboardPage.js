import React from 'react';
import ShipmentsList from './ShipmentsList';
import { Tabs } from 'antd';
import ArchiveShipmentsList from './ArchiveShipmentsList';
import { useSearchParams } from 'react-router-dom';

const DashboardPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = React.useState(
    searchParams.get('tab') || 'shipments'
  );

  const tabItems = [
    {
      key: 'shipments',
      label: 'Отправления',
      children: <ShipmentsList />,
    },
    {
      key: 'archive',
      label: 'Архив',
      children: <ArchiveShipmentsList />,
    },
  ];

  const handleTabChange = (key) => {
    setSearchParams({ tab: key });
    setActiveTab(key);
  };

  return (
    <div>
      <Tabs activeKey={activeTab} items={tabItems} onChange={handleTabChange} />
    </div>
  );
};

export default DashboardPage;

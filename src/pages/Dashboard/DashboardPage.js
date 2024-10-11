import React from 'react';
import ShipmentsList from './ShipmentsList';
import { Tabs } from 'antd';
import ArchiveShipmentsList from './ArchiveShipmentsList';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';

const DashboardPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = React.useState(
    searchParams.get('tab') || 'shipments'
  );
  const navigate = useNavigate();

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
      <div
        style={{
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            navigate('/add-shipment');
          }}
        >
          Добавить отправление
        </Button>
      </div>
      <Tabs activeKey={activeTab} items={tabItems} onChange={handleTabChange} />
    </div>
  );
};

export default DashboardPage;

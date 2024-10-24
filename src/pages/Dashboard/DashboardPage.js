import React from 'react';
import ShipmentsList from './ShipmentsList';
import { Tabs } from 'antd';
import ArchiveShipmentsList from './ArchiveShipmentsList';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import { PlusOutlined } from '@ant-design/icons';

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
        <div
          className="info-block"
          style={{
            display: 'block',
            padding: '10px',
            marginBottom: '20px',
            backgroundColor: 'var(--light)',
            borderRadius: '5px',
            color: 'var(--main)',
            fontSize: '14px',
          }}
        >
          При оформлении заказа на торговой площадке укажите{' '}
          <a
            href="/address-info"
            style={{
              textDecoration: 'underline',
            }}
          >
            адрес нашего склада в Китае
          </a>
          .
        </div>

        <Button
          type="primary"
          onClick={() => {
            navigate('/add-shipment');
          }}
          icon={<PlusOutlined />}
        >
          Добавить код отслеживания
        </Button>
      </div>
      <Tabs activeKey={activeTab} items={tabItems} onChange={handleTabChange} />
    </div>
  );
};

export default DashboardPage;

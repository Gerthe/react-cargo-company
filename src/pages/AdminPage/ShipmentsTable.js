import React, { useEffect, useState } from 'react';
import { Input, Table, Tag, Empty, Tooltip, Button, Space, Select } from 'antd';
import dayjs from 'dayjs';
import shipmentsApi from '../../api/shipments.api';
import {
  SHIPMENT_STATUSES_MAP,
  SHIPMENT_STATUSES_ORDERED,
} from '../../constants';
import { EditOutlined } from '@ant-design/icons';
import ShipmentModal from './ShipmentModal';
import AddOrphanShipmentModal from './AddOrphanShipmentModal';
import { useSearchParams } from 'react-router-dom';

const { Column } = Table;

const ShipmentsTable = () => {
  const [shipments, setShipments] = useState();
  const [loading, setLoading] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('searchValue') || ''
  );
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });
  const [sorter, setSorter] = useState({});
  const [filters, setFilters] = useState({});

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isReloadRequired, toggleReloadRequired] = useState(false);

  const handleSearch = (value) => {
    setSearchParams({ tab: 'shipments' });
    setSearchValue(value);
  };

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setLoading(true);

        const response = await shipmentsApi.getShipments(
          { page: pagination.current, limit: pagination.pageSize },
          sorter,
          filters,
          searchValue
        );
        setShipments(response.data);
        setPagination({
          ...pagination,
          total: response.pagination.total,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (
      searchParams.get('tab') === 'shipments' ||
      searchParams.get('tab') === null
    ) {
      fetchShipments();
    }
    // eslint-disable-next-line
  }, [
    pagination.current,
    pagination.pageSize,
    sorter,
    filters,
    searchValue,
    isReloadRequired,
    searchParams,
  ]);

  const handleTableChange = (newPagination, newFilters, newSorter) => {
    setPagination(newPagination);
    setSorter(newSorter);
    setFilters(newFilters);
    if (pagination.pageSize !== newPagination.pageSize) {
      setShipments([]);
    }
  };

  const showModal = (record) => {
    setSelectedShipment(record);
    setModalOpen(true);
  };

  const handleOk = () => {
    toggleReloadRequired(!isReloadRequired);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const onShipmentCreated = () => {
    toggleReloadRequired(!isReloadRequired);
    setIsCreateModalOpen(false);
  };

  const statusOptions = SHIPMENT_STATUSES_ORDERED.map((status) => ({
    label: (
      <>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: `var(--ant-${SHIPMENT_STATUSES_MAP[status].color})`,
            display: 'inline-block',
            marginRight: 8,
          }}
        />
        {SHIPMENT_STATUSES_MAP[status].title}
      </>
    ),
    value: status,
  }));

  const handleStatusChange = (values) => {
    setFilters({ ...filters, status: values });
  };

  return (
    <div>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Button type="primary" onClick={() => setIsCreateModalOpen(true)}>
          Добавить отправление
        </Button>

        <AddOrphanShipmentModal
          open={isCreateModalOpen}
          onCreate={onShipmentCreated}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </div>

      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Space>
          <Input.Search
            placeholder="Введите код отслеживания или телефон"
            onSearch={handleSearch}
            allowClear
            defaultValue={searchValue}
            style={{ width: 400 }}
            title={'Поиск по коду отслеживания или телефону'}
          />
          <Select
            style={{
              width: 300,
            }}
            placeholder="Статус отправления"
            onChange={handleStatusChange}
            options={statusOptions}
            title="Статус отправления"
            allowClear
          />
        </Space>
      </div>

      <div>
        <Table
          dataSource={shipments}
          rowKey="trackingCode"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          locale={{
            emptyText: <Empty description="Тут пока пусто" />,
          }}
          size={'small'}
        >
          <Column title="ID" dataIndex="id" key="id" width={50} />
          <Column
            title="Код отслеживания"
            dataIndex="trackingCode"
            key="trackingCode"
          />
          <Column
            title="Статус"
            dataIndex="status"
            key="status"
            render={(status) => (
              <Tag color={SHIPMENT_STATUSES_MAP[status].color}>
                {SHIPMENT_STATUSES_MAP[status].title}
              </Tag>
            )}
          />
          <Column
            title="Телефон"
            dataIndex="userPhone"
            key="userPhone"
            render={(phone, record) => {
              if (phone) {
                return `+7 ${phone} (${record.userName})`;
              } else {
                return <span style={{ color: '#900' }}>Не указан</span>;
              }
            }}
          />
          <Column
            title="Создано"
            dataIndex="createdAt"
            key="createdAt"
            render={(date) => dayjs(date).format('DD/MM/YYYY')}
          />
          <Column
            title="Обновлено"
            dataIndex="updatedAt"
            key="updatedAt"
            render={(date) => dayjs(date).format('DD/MM/YYYY')}
          />
          <Column
            title={'Комментарий'}
            dataIndex={'adminNote'}
            key={'adminNote'}
          />
          <Column
            title=""
            key="action"
            render={(value, record) => (
              <Tooltip title="Редактировать">
                <Button
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => showModal(record)}
                />
              </Tooltip>
            )}
          />
        </Table>
      </div>

      {modalOpen && selectedShipment && (
        <ShipmentModal
          open={modalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          shipmentId={selectedShipment.id}
        />
      )}
    </div>
  );
};

export default ShipmentsTable;

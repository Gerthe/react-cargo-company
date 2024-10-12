import React, { useEffect, useState } from 'react';
import { Input, Table, Tag, Empty, Tooltip, Button } from 'antd';
import dayjs from 'dayjs';
import shipmentsApi from '../../api/shipments.api';
import { SHIPMENT_STATUSES_MAP } from '../../constants';
import useDebounce from '../../hooks/useDebounce';
import { EditOutlined } from '@ant-design/icons';
import ShipmentModal from './ShipmentModal';

const { Column } = Table;

const ShipmentsTable = () => {
  const [shipments, setShipments] = useState();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });
  const [sorter, setSorter] = useState({});
  const [filters, setFilters] = useState({});

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState();

  const [isReloadRequired, toggleReloadRequired] = useState(false);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setLoading(true);

        // Call the API with pagination, sorter, and filters
        const response = await shipmentsApi.getShipments(
          pagination,
          sorter,
          filters,
          debouncedSearchValue
        );

        // Update the shipments state with the fetched data
        setShipments(response.data);

        // Update pagination, if needed
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

    // Fetch shipments when pagination, sorter, or filters change
    fetchShipments();
  }, [
    pagination.current,
    pagination.pageSize,
    sorter,
    filters,
    debouncedSearchValue,
    isReloadRequired,
  ]);

  const handleTableChange = (newPagination, newFilters, newSorter) => {
    console.log(pagination, filters, sorter);
    setPagination(newPagination);
    setSorter(newSorter);
    setFilters(newFilters);

    // `dataSource` is useless since `pageSize` changed
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

  return (
    <div>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Input.Search
          placeholder="Введите код отслеживания или телефон"
          onChange={handleSearch}
        />
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
            render={(phone) => '+7 ' + phone}
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
            title="Action"
            key="action"
            render={(value, record) => (
              <Tooltip title="Изменить статус">
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

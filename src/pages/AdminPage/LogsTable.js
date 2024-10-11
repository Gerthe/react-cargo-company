import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Empty, Input, Space, Table, Tag } from 'antd';
import logsApi from '../../api/logs.api';
import { SHIPMENT_STATUSES_MAP } from '../../constants';
import useDebounce from '../../hooks/useDebounce';

const Column = Table.Column;

const LogsTable = () => {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 50,
  });
  const [sorter, setSorter] = useState({});
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setLoading(true);

        // Call the API with pagination, sorter, and filters
        const response = await logsApi.getLogs(
          pagination,
          sorter,
          filters,
          debouncedSearchValue
        );

        // Update the shipments state with the fetched data
        setLogs(response.data);

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
  ]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleTableChange = (newPagination, newFilters, newSorter) => {
    console.log(pagination, filters, sorter);
    setPagination(newPagination);
    setSorter(newSorter);
    setFilters(newFilters);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== newPagination.pageSize) {
      setLogs([]);
    }
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
          dataSource={logs}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          locale={{
            emptyText: <Empty description="Тут пока пусто" />,
          }}
          size={'small'}
        >
          <Column
            title="ID"
            dataIndex="shipmentId"
            key="shipmentId"
            width={50}
          />
          <Column
            title="Код отслеживания"
            dataIndex="trackingCode"
            key="trackingCode"
          />
          <Column
            title="Изменение статуса"
            key="status"
            render={(value, record) => (
              <Space>
                <Tag color={SHIPMENT_STATUSES_MAP[record.previousStatus].color}>
                  {SHIPMENT_STATUSES_MAP[record.previousStatus].title}
                </Tag>
                {'>'}
                <Tag color={SHIPMENT_STATUSES_MAP[record.newStatus].color}>
                  {SHIPMENT_STATUSES_MAP[record.newStatus].title}
                </Tag>
              </Space>
            )}
          />
          <Column
            title="Дата изменения"
            dataIndex="changedAt"
            key="changedAt"
            render={(date) => dayjs(date).format('DD/MM/YYYY HH:mm:ss')}
          />
        </Table>
      </div>
    </div>
  );
};

export default LogsTable;

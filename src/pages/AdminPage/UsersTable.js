import React, { useEffect, useState } from 'react';
import { Table, Button, Input } from 'antd';
import dayjs from 'dayjs';
import usersApi from '../../api/users.api';
import useDebounce from '../../hooks/useDebounce';

const { Column } = Table;

const UsersTable = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  useEffect(() => {
    console.log('fetching users');
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await usersApi.getUsers(
          pagination,
          null,
          null,
          debouncedSearchValue
        );
        setUsers(response.data);
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
    fetchUsers();
  }, [pagination.pageSize, debouncedSearchValue, pagination.current]);

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);

    console.log(newPagination);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== newPagination.pageSize) {
      setUsers([]);
    }
  };

  return (
    <div>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Input.Search placeholder="Введите телефон" onChange={handleSearch} />
      </div>

      <Table
        dataSource={users}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="phone"
        size={'small'}
      >
        <Column
          title="Телефон"
          dataIndex="phone"
          key="phone"
          render={(phone) => '+7' + phone}
        />
        <Column title="Имя" dataIndex="name" key="name" />
        <Column
          title="Заказы"
          dataIndex="shipmentsCount"
          key="shipmentsCount"
          render={(count) => <Button type="link">{count}</Button>}
        />
        <Column
          title="Создан"
          dataIndex="created_at"
          key="createdAt"
          render={(date) => dayjs(date).format('DD/MM/YYYY')}
        />
      </Table>
    </div>
  );
};

export default UsersTable;

import React from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';
import usersApi from '../../api/users.api';

const { Column } = Table;

const UsersTable = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await usersApi.getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Table dataSource={users} loading={loading} rowKey="phone" size={'small'}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column
          title="Телефон"
          dataIndex="phone"
          key="phone"
          render={(phone) => '+7' + phone}
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

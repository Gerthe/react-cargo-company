import React, { useEffect, useState } from 'react';
import { Col, Image, Row, Typography, Grid } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import screenShot from '../../assets/screenshot.jpg';
import usersApi from '../../api/users.api';

const { useBreakpoint } = Grid;

const AddressInfoPage = () => {
  const screens = useBreakpoint();
  const isMobile = screens.lg === false;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await usersApi.getMyInfo();
        setUser(response);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <a
        style={{
          marginTop: 40,
          marginBottom: 20,
          color: 'var(--main)',
          display: 'inline-block',
        }}
        href={'/dashboard'}
      >
        <LeftOutlined /> Назад
      </a>

      <Row gutter={20}>
        <Col>
          <Typography.Paragraph>
            При заполнении адреса доставки укажите следующие данные как в
            примере:
          </Typography.Paragraph>

          <div
            style={{
              padding: 10,
              borderRadius: 5,
              backgroundColor: '#f0fff0',
              border: '1px solid #87d068',
              marginBottom: 20,
            }}
          >
            <Typography.Paragraph
              copyable={{
                text: `PC-${user?.phone?.slice(-4)}\n13521750477\n北京市 朝阳区\n朝外大街26号 朝外门地下三层816库房 PekinCargo888 +7${user?.phone} ${user?.name} ${user?.location}`,
              }}
            >
              PC-{user?.phone?.slice(-4)}
              <br />
              13521750477
              <br />
              北京市 朝阳区
              <br />
              朝外大街26号 朝外门地下三层816库房 PekinCargo888 +7{
                user?.phone
              }{' '}
              {user?.name} {user?.location}
            </Typography.Paragraph>
          </div>

          <Image
            src={screenShot}
            preview={isMobile}
            style={{ margin: '0 auto', display: 'block', width: 300 }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AddressInfoPage;

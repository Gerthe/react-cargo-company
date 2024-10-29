import { Col, Image, Row, Space, Typography, Grid, Divider } from 'antd';
import { flexTwoColumnsConfig } from '../../theme';
import { DoubleRightOutlined } from '@ant-design/icons';
import React from 'react';

import taobaoLogo from '../../assets/taobao.png';
import poisonLogo from '../../assets/dewu.png';
import s1688Logo from '../../assets/1688.png';
import pinduoduoLogo from '../../assets/Pinduoduologo.png';
import screenShot from '../../assets/screenshot.jpg';

const { useBreakpoint } = Grid;
const logoSize = 60;

const MarketplacesSection = () => {
  const screens = useBreakpoint();
  const isMobile = screens.lg === false;

  return (
    <section className="wrapper" id="marketplaces">
      <div
        style={{
          backgroundColor: '#fff',
          padding: '20px 20px 40px',
          fontSize: 20,
        }}
      >
        <h2>
          Как заказать? <DoubleRightOutlined />
        </h2>
        <Row gutter={20} style={{ paddingBottom: 40 }}>
          <Col style={{ paddingBottom: 20 }} {...flexTwoColumnsConfig}>
            <Typography.Paragraph>
              С нами вы можете заказывать товары с самых топовых торговых
              площадок Китая —{' '}
              <Typography.Text strong>
                Pinduoduo, Poizon, Taobao и других
              </Typography.Text>
              . Мы сделаем процесс покупки простым и удобным: вы выбираете, а мы
              заботимся о доставке!
            </Typography.Paragraph>
          </Col>
          <Col {...flexTwoColumnsConfig}>
            <Space size="large" gap={20} wrap>
              <Image
                src={taobaoLogo}
                height={logoSize}
                preview={false}
                style={{ alignSelf: 'flex-start' }}
              />
              <Image
                src={poisonLogo}
                height={logoSize}
                preview={false}
                style={{ alignSelf: 'flex-start' }}
              />
              <Image
                src={s1688Logo}
                height={logoSize}
                preview={false}
                style={{ alignSelf: 'flex-start' }}
              />
              <Image
                src={pinduoduoLogo}
                height={logoSize}
                preview={false}
                style={{ alignSelf: 'flex-start' }}
              />
            </Space>
          </Col>
        </Row>
        <Divider />
        <Row gutter={20}>
          <Col>
            <DoubleRightOutlined style={{ color: 'var(--secondary)' }} /> При
            заполнении адреса доставки укажите следующие данные как в примере:
            <Row
              gutter={20}
              style={{
                marginTop: 20,
              }}
            >
              <Col {...flexTwoColumnsConfig}>
                <div
                  style={{
                    padding: 10,
                    borderRadius: 5,
                    backgroundColor: '#f0fff0',
                    border: '1px solid #87d068',
                  }}
                >
                  <Typography.Paragraph
                    copyable={{
                      text: 'PC-[4 последние цифры вашего номера телефона] 13521750477 北京市 朝阳区 朝外大街26号 朝外门地下三层816库房 PekinCargo888 [Номер телефона, имя, город получателя]',
                    }}
                  >
                    PC-[4 последние цифры вашего номера телефона]
                    <br />
                    13521750477
                    <br />
                    北京市 朝阳区
                    <br />
                    朝外大街26号 朝外门地下三层816库房 PekinCargo888 [Номер
                    телефона, имя, город получателя]
                  </Typography.Paragraph>
                </div>
              </Col>

              <Col {...flexTwoColumnsConfig} justify="center">
                <Image
                  src={screenShot}
                  preview={isMobile}
                  style={{
                    margin: '0 auto 20px',
                    display: 'block',
                    width: '50%',
                  }}
                />
              </Col>
            </Row>
            <Typography.Paragraph>
              Мы принимаем ваш товар, тщательно проверяем и подготавливаем его к
              отправке. Ваш груз будет в надежных руках, пока не отправится к
              вам!
            </Typography.Paragraph>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default MarketplacesSection;

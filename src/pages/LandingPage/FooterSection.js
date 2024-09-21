import React from 'react';
import { Col, Flex, Row, Space } from 'antd';
import { MailTwoTone, PhoneTwoTone, TikTokOutlined } from '@ant-design/icons';
import { flexTwoColumnsConfig } from '../../theme';

const items = [
  { key: 'services', label: 'Услуги' },
  { key: 'advantages', label: 'Приемущества' },
  { key: 'contact', label: 'Форма связи' },
  { key: 'faq', label: 'FAQ' },
];

const FooterSection = () => {
  return (
    <footer>
      <Row className="wrapper" justify="space-between">
        <Col {...flexTwoColumnsConfig} style={{ textAlign: 'left' }}>
          {items.map((item) => (
            <div key={item.key}>
              <a
                href={'#' + item.key}
                style={{
                  color: 'var(--secondary)',
                  fontSize: 18,
                  lineHeight: 1.5,
                }}
              >
                {item.label}
              </a>
            </div>
          ))}
        </Col>
        <Col>
          <Flex
            vertical
            className="contact-info"
            gap="small"
            style={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            <Space>
              <PhoneTwoTone twoToneColor="#7AC74F" style={{ fontSize: 24 }} />
              <a href="tel:+77761234588" style={{ color: 'var(--secondary)' }}>
                +77761234588
              </a>
            </Space>
            <Space>
              <MailTwoTone twoToneColor="#7AC74F" style={{ fontSize: 24 }} />
              <a
                href="mailto:+77761234588"
                style={{ color: 'var(--secondary)' }}
              >
                ashalmuhanova@gmail.com
              </a>
            </Space>
            <Space>
              <TikTokOutlined
                style={{ color: 'var(--secondary)', fontSize: 24 }}
              />
              <a
                href="https://www.tiktok.com/@pekin_cargo_888"
                rel="noreferrer"
                target="_blank"
                style={{ color: 'var(--secondary)' }}
              >
                Наш TikTok
              </a>
            </Space>
          </Flex>
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ marginTop: 20 }}>
          Pekin Cargo 888 ©{new Date().getFullYear()} Created by Gerthe
        </Col>
      </Row>
    </footer>
  );
};

export default FooterSection;

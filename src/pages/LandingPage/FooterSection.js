import React from 'react';
import { Col, Divider, Row } from 'antd';
import Icon, {
  InstagramOutlined,
  PhoneFilled,
  TikTokOutlined,
} from '@ant-design/icons';
import { flexTwoColumnsConfig } from '../../theme';
import { TelegramIcon } from '../../constants/customIcons';

const items = [
  { key: 'services', label: 'Услуги' },
  { key: 'advantages', label: 'Приемущества' },
  { key: 'contact', label: 'Форма связи' },
  { key: 'faq', label: 'FAQ' },
];

const iconSize = 27;
const linkProps = {
  rel: 'noreferrer',
  target: '_blank',
};
const dividerStyle = {
  borderColor: 'var(--secondary)',
  color: 'var(--accent)',
};

const socialLinks = [
  {
    key: 'phone',
    link: 'tel:+77761234588',
    title: '+77761234588',
    icon: (
      <PhoneFilled style={{ fontSize: iconSize, color: 'var(--secondary)' }} />
    ),
  },
  {
    key: 'tiktok',
    link: 'https://www.tiktok.com/@pekin_cargo_888',
    title: 'Наш TikTok',
    icon: (
      <TikTokOutlined
        style={{ color: 'var(--secondary)', fontSize: iconSize }}
      />
    ),
    linkProps,
  },
  {
    key: 'instagram',
    link: 'https://www.instagram.com/pekin_cargo_888/',
    title: 'pekin_cargo_888',
    icon: (
      <InstagramOutlined
        style={{ color: 'var(--secondary)', fontSize: iconSize }}
      />
    ),
    linkProps,
  },
  {
    key: 'telegram',
    link: 'https://t.me/pekin_cargo_888',
    title: '@pekin_cargo_888',
    icon: (
      <Icon
        component={TelegramIcon}
        style={{ fontSize: iconSize, color: 'var(--secondary)' }}
      />
    ),
    linkProps,
  },
];

const FooterSection = () => {
  return (
    <footer className="wrapper">
      <Row
        justify="space-between"
        gutter={20}
        style={{
          textAlign: 'left',
        }}
      >
        <Col {...flexTwoColumnsConfig}>
          <Divider style={dividerStyle}>Навигация</Divider>
          <ul>
            {items.map((item) => (
              <li
                key={item.key}
                style={{
                  listStyleType: 'none',
                }}
              >
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
              </li>
            ))}
          </ul>
        </Col>
        <Col {...flexTwoColumnsConfig}>
          <Divider style={dividerStyle}>Контакты</Divider>
          <ul>
            {socialLinks.map((link) => (
              <li
                key={link.key}
                style={{
                  listStyleType: 'none',
                }}
              >
                {link.icon}
                <a
                  href={link.link}
                  {...link.linkProps}
                  style={{
                    color: 'var(--secondary)',
                    fontSize: 18,
                    lineHeight: 1.5,
                    paddingLeft: 10,
                  }}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <Row>
        <Divider style={dividerStyle} />
        <Col span={24} style={{ marginTop: 20 }}>
          Pekin Cargo 888 © {new Date().getFullYear()} Created by{' '}
          <a href="mailto:julkuleshova@gmail.com" style={{ color: '#900' }}>
            Gerthe
          </a>
        </Col>
      </Row>
    </footer>
  );
};

export default FooterSection;

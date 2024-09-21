import { Col, Row } from 'antd';
import React from 'react';
import './ServicesSection.css';
import { DoubleRightOutlined, StarFilled } from '@ant-design/icons';
import { flexTwoColumnsConfig } from '../../theme';

const headerStyle = {
  borderBottom: '5px solid var(--secondary',
  color: 'var(--accent)',
};

const advantages = [
  {
    title: 'Автомобильные перевозки',
    list: [
      'Быстрая и надежная доставка ваших грузов по доступной цене. Мы предлагаем гибкие условия и индивидуальный подход к каждому клиенту.',
      'Доставка занимает от 7 до 14 дней*',
      'Стоимость доставки – 3,6$ за 1 кг.',
    ],
  },
  {
    title: 'Складирование',
    list: [
      'Наши современные складские помещения созданы для безопасного и удобного хранения ваших товаров.',
      'Первые 7 дней хранения абсолютно бесплатны! Если потребуется дольше, дальнейшее хранение стоит всего 500 тг за день.',
      'Мы внимательно следим за правилами размещения товаров, не размещаем технику рядом с жидкостями, чтобы минимизировать риски повреждения.',
    ],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="styled-container wrapper">
      <div style={{ padding: 20 }}>
        <h2 style={{ color: 'var(--light)' }}>
          Наши Услуги <DoubleRightOutlined />
        </h2>
        <Row gutter={20} style={{ color: 'var(--light' }}>
          {advantages.map((item, index) => (
            <Col {...flexTwoColumnsConfig} key={index}>
              <h3 style={headerStyle}>{item.title}</h3>
              {item.list.map((point, index) => (
                <p key={index}>
                  <StarFilled style={{ color: 'var(--secondary' }} /> {point}
                </p>
              ))}
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default ServicesSection;

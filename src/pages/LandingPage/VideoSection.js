import React from 'react';
import { Col, Row } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import { TikTok } from 'react-tiktok';
import { flexTwoColumnsConfig } from '../../theme';

const videoUrl =
  'https://www.tiktok.com/@pekin_cargo_888/video/7431127863824256262';

const VideoSection = () => {
  return (
    <section style={{ background: '#fff' }}>
      <div className="wrapper">
        <Row justify="space-between" gutter={20}>
          <Col {...flexTwoColumnsConfig}>
            <h2>
              Наш TikTok <DoubleRightOutlined />
            </h2>
            <p>
              Окунитесь в реальный процесс работы нашего склада и узнайте, как
              мы заботимся о ваших грузах! В нашем TikTok-канале Pekin Cargo 888
              мы делимся короткими видео, которые показывают все этапы обработки
              товаров — от приема и сортировки до упаковки и отправки.
            </p>
            <p>
              Каждое видео — это возможность увидеть нашу команду в действии и
              убедиться в нашей надежности. Присоединяйтесь к нашему сообществу
              на TikTok, следите за обновлениями и будьте в курсе всех новостей
              и полезных советов по логистике и доставке из Китая.
            </p>
          </Col>
          <Col
            {...flexTwoColumnsConfig}
            style={{ width: 590, height: 879, marginBottom: 20 }}
          >
            <TikTok url={videoUrl} />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default VideoSection;

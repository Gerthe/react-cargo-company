import {Col, Image, Row, Space, Typography} from "antd";
import {flexTwoColumnsConfig} from "../theme";

import taobaoLogo from '../assets/taobao.png';
import poisonLogo from '../assets/dewu.png';
import s1688Logo from '../assets/1688.png';
import pinduoduoLogo from '../assets/Pinduoduologo.png'
import {DoubleRightOutlined} from "@ant-design/icons";

const ADDRESS = '北京市朝阳区雅宝路朝外门地下三层816库房 13521750477 王志';

const logoSize = 60;

const MarketplacesSection = () => {
  return <section className="wrapper" id="marketplaces">
    <div style={{
      backgroundColor: '#fff',
      padding: '20px 20px 40px',
      fontSize: 20

    }}>
      <h2>Как заказать? <DoubleRightOutlined/></h2>
      <Row gutter={20} style={{paddingBottom: 40}}>
        <Col style={{paddingBottom: 20}} {...flexTwoColumnsConfig}>
          <Typography.Paragraph>С нами вы можете заказывать товары с самых топовых торговых площадок Китая — <Typography.Text strong>Pinduoduo,
            Poizon, Taobao и
            других</Typography.Text>. Мы сделаем процесс покупки простым и удобным: вы выбираете, а мы заботимся о
            доставке!</Typography.Paragraph>
        </Col>
        <Col {...flexTwoColumnsConfig}>
          <Space size='large' gap={20} wrap>
            <Image src={taobaoLogo} height={logoSize} preview={false}/>
            <Image src={poisonLogo} height={logoSize} preview={false}/>
            <Image src={s1688Logo} height={logoSize} preview={false}/>
            <Image src={pinduoduoLogo} height={logoSize} preview={false}/>
          </Space>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col>
          <DoubleRightOutlined style={{color: 'var(--secondary)'}}/> При оформлении заказа просто укажите наш склад в
          Пекине как адрес получателя:
          <Typography.Paragraph copyable={{text: ADDRESS}} style={{
            padding: 20,
            margin: '20px 0',
            border: '5px solid var(--secondary)',
            fontWeight: 700,
            fontSize: 20
          }}>Адрес в Пекине: {ADDRESS}</Typography.Paragraph>
          Мы принимаем ваш
          товар, тщательно проверяем и подготавливаем его к отправке. Ваш груз будет в надежных руках, пока не
          отправится
          к вам!
        </Col>
      </Row>
    </div>
  </section>
}

export default MarketplacesSection;
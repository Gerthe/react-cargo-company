import {Col, Flex, Row, Space} from "antd";
import {MailTwoTone, PhoneTwoTone, TikTokOutlined} from "@ant-design/icons";
import {flexTwoColumnsConfig} from "../theme";

const FooterSection = () => {
  return <footer>
    <Row className='wrapper'>
      <Col {...flexTwoColumnsConfig}>
        <nav>
          <ul style={{listStyle: 'none', textAlign: 'left', padding: 0}}>
            <li>Услуги</li>
            <li>Складирование</li>
            <li>Преимущества</li>
            <li>FAQ</li>
          </ul>
        </nav>
      </Col>
      <Col {...flexTwoColumnsConfig}>
        <Flex vertical className="contact-info" gap="small" style={{
          fontSize: 18,
          fontWeight: 500
        }}>
          <Space>
            <PhoneTwoTone twoToneColor="#7AC74F" style={{fontSize: 24}}/>
            <a href="tel:+77761234588" style={{color: "var(--secondary)"}}>+77761234588</a>
          </Space>
          <Space>
            <MailTwoTone twoToneColor="#7AC74F" style={{fontSize: 24}}/>
            <a href="mailto:+77761234588" style={{color: "var(--secondary)"}}>ashalmuhanova@gmail.com</a>
          </Space>
          <Space>
            <TikTokOutlined style={{color: "var(--secondary)", fontSize: 24}}/>
            <a href="https://www.tiktok.com/@pekin_cargo_888" rel="noreferrer" target="_blank"
               style={{color: "var(--secondary)"}}>Наш TikTok</a>
          </Space>
        </Flex>
      </Col>
    </Row>

    <Row><Col span={24} style={{marginTop: 20}}>Pekin Cargo 888 ©{new Date().getFullYear()} Created by Gerthe</Col></Row>
  </footer>
};

export default FooterSection;
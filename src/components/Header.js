import Menu from "./Menu";
import './Header.css';
import {Flex, Space} from "antd";
import {MailTwoTone, PhoneFilled, PhoneTwoTone, TikTokOutlined} from "@ant-design/icons";
import image from './../assets/085.svg';
import Button from "./Button";

const Header = () => {
  return <header className="header">
    <div className="container">
      <img src={image} className="logo-accent"/>
      <Flex justify="space-between">
        <h1>Pekin<br/>Cargo<br/>888</h1>
        <Flex vertical className="contact-info" gap="small">
          <Space>
            <PhoneTwoTone twoToneColor="#ff4365" style={{fontSize: 24}}/>
            <a href="tel:+77761234588" style={{color: "var(--main)"}}>+77761234588</a>
          </Space>
          <Space>
            <MailTwoTone twoToneColor="#ff4365" style={{fontSize: 24}}/>
            <a href="mailto:+77761234588" style={{color: "var(--main)"}}>ashalmuhanova@gmail.com</a>
          </Space>
          <Space>
            <TikTokOutlined style={{color: "var(--secondary)", fontSize: 24}}/>
            <a href="" target="_blank" style={{color: "var(--main)"}}>Наш TikTok</a>
          </Space>

          <Button size="large" type="primary" icon={<PhoneFilled/>}>Вам перезонить?</Button>
        </Flex>
      </Flex>

      <Menu/>
    </div>
  </header>
}

export default Header;
import './Header.css';
import {Flex, Menu as AntMenu, Space} from "antd";
import {MailTwoTone, PhoneFilled, PhoneTwoTone, TikTokOutlined} from "@ant-design/icons";
import image from './../assets/085.svg';
import Button from "./Button";
import {useState} from "react";

const items = [
  {key: 'services', label: <a href='#services'>Услуги</a>},
  {key: 'advantages', label: <a href='#advantages'>Приемущества</a>},
  {key: 'faq', label: <a href='#faq'>FAQ</a>}
]

const HeaderSection = () => {
  const [current, setCurrent] = useState();
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <header className="header">
    <div className="wrapper">
      <img src={image} className="logo-accent" alt="Pekin Cargo 888"/>
      <Flex justify="space-between">
        <h1>Pekin<br/>Cargo<br/>888</h1>
        <Flex vertical className="contact-info" gap="small" style={{
          fontSize: 18,
          fontWeight: 500
        }}>
          <Space>
            <PhoneTwoTone twoToneColor="#7AC74F" style={{fontSize: 24}}/>
            <a href="tel:+77761234588" style={{color: "var(--main)"}}>+77761234588</a>
          </Space>
          <Space>
            <MailTwoTone twoToneColor="#7AC74F" style={{fontSize: 24}}/>
            <a href="mailto:+77761234588" style={{color: "var(--main)"}}>ashalmuhanova@gmail.com</a>
          </Space>
          <Space>
            <TikTokOutlined style={{color: "var(--secondary)", fontSize: 24}}/>
            <a href="https://www.tiktok.com/@pekin_cargo_888" rel="noreferrer" target="_blank"
               style={{color: "var(--main)"}}>Наш TikTok</a>
          </Space>

          <Button size="large" type="primary" icon={<PhoneFilled/>} style={{
            fontSize: 20,
            marginTop: 8
          }}
          >
            Вам перезонить?
          </Button>
        </Flex>
      </Flex>

      <AntMenu items={items} selectedKeys={[current]} onClick={onClick} mode="horizontal"
               style={{
                 textTransform: 'uppercase',
                 fontSize: 20,
                 lineHeight:2,
                 fontWeight: "bold",
                 borderBottom: 0,
                 margin: '12px 0'
               }
               }
      />

    </div>
  </header>
}

export default HeaderSection;
import './Header.css';
import {Col, Flex, Menu, Row, Grid} from "antd";
import {MailTwoTone, PhoneFilled, PhoneTwoTone, TikTokOutlined} from "@ant-design/icons";
import image from './../assets/085.svg';
import Button from "./Button";
import {useState} from "react";

const {useBreakpoint} = Grid;

const items = [
  {key: 'services', label: <a href='#services'>Услуги</a>},
  {key: 'advantages', label: <a href='#advantages'>Приемущества</a>},
  {key: 'faq', label: <a href='#faq'>FAQ</a>}
]

const HeaderSection = () => {
  const [current, setCurrent] = useState();
  const screens = useBreakpoint();
  const showFull = screens.lg === true;
  const iconSize = showFull ? 24 : 36;

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const socialLinks = [{
    key: 'phone',
    link: 'tel:+77761234588',
    title: '+77761234588',
    icon: <PhoneTwoTone twoToneColor="#7AC74F" style={{fontSize: iconSize}}/>
  },
    {
      key: 'email',
      link: 'mailto:+77761234588',
      title: 'ashalmuhanova@gmail.com',
      icon: <MailTwoTone twoToneColor="#7AC74F" style={{fontSize: iconSize}}/>
    },
    {
      key: 'tiktok',
      link: 'https://www.tiktok.com/@pekin_cargo_888',
      title: 'Наш TikTok',
      icon: <TikTokOutlined style={{color: "var(--secondary)", fontSize: iconSize}}/>,
      linkProps: {
        rel: "noreferrer", target: "_blank"
      }
    }]

  const callButton = <Button size="large" type="primary"
                             icon={<PhoneFilled/>}
                             style={{
                               fontSize: 20,
                               marginTop: 8
                             }}
  >
    Вам перезвонить?
  </Button>

  return <header className="header">
    <div className="wrapper">
      <Row justify="space-between">
        <Col>
          <img src={image} className="logo-accent" alt="Pekin Cargo 888"/>
          <h1>Pekin<br/>Cargo<br/>888</h1>
        </Col>
        <Col>
          <Flex vertical={showFull}
                className="contact-info"
                gap="small"
                style={{
                  fontWeight: 500,
                  fontSize: 18
                }}
                align={'flex-start'}
          >
            {socialLinks.map(
              (item) => <a key={item.key}
                           href={item.link}
                           style={{color: "var(--main)"}}
                           {...(item.linkProps || [])}
              >
                {item.icon}
                {showFull && (' ' + item.title)}
              </a>)}

            {showFull && callButton}
          </Flex>

        </Col>
      </Row>

      <Menu items={items} selectedKeys={[current]} onClick={onClick} mode="horizontal"
            style={{
              textTransform: 'uppercase',
              fontSize: 20,
              lineHeight: 2,
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
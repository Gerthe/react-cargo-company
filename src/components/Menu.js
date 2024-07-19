import {Menu as AntMenu} from 'antd';
import {useState} from "react";

const items = [
  {key: 'services', label: <a href='#services'>Услуги</a>},
  {key: 'customs', label: 'Таможенные услуги'},
  {key: 'warehousing', label: 'Складирование'},
  {key: 'advantages', label: 'Преимущества'},
  {key: 'faq', label: 'FAQ'}
]
const Menu = () => {
  const [current, setCurrent] = useState('mail');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <AntMenu items={items} selectedKeys={[current]} onClick={onClick} mode="horizontal"/>
}

export default Menu;
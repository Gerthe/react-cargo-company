import {Col, Flex} from "antd";
import './ServicesSection.css';
import {StarFilled } from "@ant-design/icons";

const ServicesSection = () => {
  return <section id="services" className="services styled-container">
    <h2>Наши Услуги</h2>
    <Flex gap="large">
      <div style={{width: '50%'}} className="service">
        <h3>Автомобильные перевозки</h3>

        <p><StarFilled style={{color: "#ff4365"}}/> Быстрая и надежная доставка ваших грузов по доступной цене. Мы предлагаем гибкие условия и
          индивидуальный подход к каждому клиенту.</p>
        <p><StarFilled style={{color: "#ff4365"}} /> Доставка занимает от 7 до 14 дней*</p>
        <p><StarFilled style={{color: "#ff4365"}}/> Стоимость доставки – 3,6$ за 1 кг.</p>
      </div>

      <div style={{width: '50%'}} className="service">
        <h3>Складирование</h3>

        <p><StarFilled style={{color: "#ff4365"}}/> Современные складские помещения для хранения ваших товаров.</p>
        <p><StarFilled style={{color: "#ff4365"}}/> Хранение до 7 дней бесплатно, затем платная услуга – 500 тг за каждый день.</p>
      </div>
    </Flex>
  </section>
}

export default ServicesSection;
import './HeroSection.css';
import Button from "./Button";
import {Col, Row, Image} from "antd";
import {flexTwoColumnsConfig} from "../theme";

const HeroSection = () => {
  return <section className="hero">
    <div className="wrapper">
      <Row gutter={20}>
        <Col {...flexTwoColumnsConfig}>
          <h2>Доставка грузов из Китая – быстро, надежно, выгодно!</h2>
          <strong className="hero-accent">Ваш надежный партнер в логистике.</strong>
          <p>Мы специализируемся на доставке товаров из Китая в кратчайшие сроки. Наши опытные специалисты обеспечат полное сопровождение вашего груза, от погрузки до доставки на склад. С нами ваш бизнес становится проще!</p>
          <Button type="primary" size="large">Рассчитать стоимость</Button>
        </Col>
        <Col {...flexTwoColumnsConfig}>
          <Image src="./source/hero-bg2.svg" preview={false} style={{margin: '40px auto'}}/>
        </Col>
      </Row>

    </div>
  </section>
}

export default HeroSection;
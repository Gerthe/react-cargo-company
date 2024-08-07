import './HeroSection.css';
import Button from "./Button";
import {Flex, Image} from "antd";

const HeroSection = () => {
  return <section className="hero">
    <div className="container">
      <Flex gap={20}>
        <div style={{width: "50%"}}>
          <h2>Доставка грузов из Китая – быстро, надежно, выгодно!</h2>
          <strong className="hero-accent">Ваш надежный партнер в логистике.</strong>
          <p>Мы специализируемся на доставке товаров из Китая в кратчайшие сроки. Наши опытные специалисты обеспечат полное сопровождение вашего груза, от погрузки до доставки на склад. С нами ваш бизнес становится проще!</p>
          <Button type="primary" size="large">Рассчитать стоимость</Button>
        </div>
        <div>
          <Image src="./source/hero-bg2.svg" preview={false}/>
        </div>
      </Flex>

    </div>
  </section>
}

export default HeroSection;
import {Col, Row} from "antd";
import StyledCard from "./StyledCard";
import fig1 from './../assets/053.svg';
import fig2 from './../assets/074.svg'
import fig3 from './../assets/079.svg'
import fig4 from './../assets/089.svg'

const AdvantagesSection = () => {
  return <section className="advantages" style={{padding: '40px 0'}}>
    <h2>Преимущества компании</h2>
    <Row gutter={[24, 24]}>
      <Col span={12}>
        <StyledCard title="Надежность"
                    description="Мы гарантируем сохранность и своевременную доставку ваших грузов."
                    image={fig1}
                    style={{height: 200}}
        />
      </Col>
      <Col span={12}>
        <StyledCard title='Конкурентные цены'
                    description={<>Доступные тарифы и прозрачная стоимость услуг – <span
                      className="highlighted">3,6$</span> за 1 кг."</>}
                    image={fig2}
                    style={{height: 200}}
        />
      </Col>
    </Row>
    <Row gutter={[24, 24]}>
      <Col span={12}>
        <StyledCard title='Мониторинг 24/7'
                    description="Круглосуточное отслеживание и поддержка."
                    image={fig3}
                    style={{height: 200}}
        />
      </Col>
      <Col span={12}>
        <StyledCard title='Гарантии'
                    description="Полное страхование груза и ответственность за результат."
                    image={fig4}
                    style={{height: 200}}
        />
      </Col>
    </Row>
  </section>
}

export default AdvantagesSection;
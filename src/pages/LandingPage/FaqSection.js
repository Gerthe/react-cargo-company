import React from 'react';
import { Divider, Flex } from 'antd';

const faqQuestions = [
  {
    title: 'Каковы сроки доставки?',
    answer:
      'Срок доставки составляет от 7 до 14 дней.* В праздничные дни сроки могут увеличиваться из-за таможенных процедур.',
  },
  {
    title: 'Как сделать заказ?',
    answer:
      'После оформления заказа на китайской торговой площадке, укажите наш склад в Китае в качестве адреса доставки. Мы позаботимся о том, чтобы ваш товар был быстро и безопасно доставлен к вам.',
  },
  {
    title: 'Можно ли дополнительно упаковать мой груз?',
    answer:
      'Да, мы можем дополнительно упаковать ваш груз. Для этого свяжитесь с нами через Telegram или заполните форму обратной связи на сайте, приложив ссылку на товар. Мы рассчитаем стоимость дополнительной упаковки и предоставим вам все детали.',
  },
];

const FaqSection = () => {
  return (
    <section className="wrapper" id="faq">
      <h2>Часто задаваемые вопросы (FAQ)</h2>
      <Flex vertical>
        {faqQuestions.map((item, index) => (
          <div key={index}>
            <h3>
              {index + 1}. {item.title}
            </h3>
            {item.answer}
            <Divider
              style={{
                borderColor: 'var(--secondary)',
              }}
            />
          </div>
        ))}
      </Flex>
    </section>
  );
};

export default FaqSection;

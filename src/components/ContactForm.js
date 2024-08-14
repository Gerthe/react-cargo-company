import {Col, Form, Image, Input, Result, Row} from "antd";
import messageImage from "../assets/message.svg";
import {DoubleRightOutlined} from "@ant-design/icons";
import Button from "./Button";
import {useEffect, useState} from "react";
import {flexTwoColumnsConfig} from "../theme";

const TextArea = Input.TextArea;

const ContactForm = () => {
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const handleSubmit = () => {
    fetch('/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.getFieldsValue()),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setIsSubmitted(true);
        } else {
          alert('Error sending message.');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return <section className="wrapper">
    <Row gutter={40} style={{fontSize: 18}}>
      <Col {...flexTwoColumnsConfig}>
        <h2>Напишите нам <DoubleRightOutlined/></h2>
        <Image src={messageImage} width={250} preview={false} style={{
          margin: 40,
          fontSize: 18
        }}/>
        <div>
          Готовы обсудить детали? Свяжитесь с нами по телефону +77761234588 или отправьте нам сообщение через
          форму обратной связи. Наши специалисты всегда готовы ответить на все ваши вопросы и предоставить
          необходимую
          поддержку.
        </div>

      </Col>
      <Col {...flexTwoColumnsConfig}>
        <div style={{
          border: '5px solid var(--secondary)',
          borderRadius: 4,
          padding: 20,
          margin: '20px 0'
        }}>
          {isSubmitted ? (
              <Result
                status="success"
                title="Сообщение отправлено!"
                subTitle="Спасибо за ваше сообщение! Наш оператор свяжется с вами в ближайшее время, чтобы уточнить все детали вашего заказа."
              />
          ) : (
            <Form form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item label="Ваше имя" name="name" rules={[
                {
                  required: true,
                  message: 'Сообщите нам Ваше имя, чтобы мы знали как к Вам обратиться',
                },
              ]}>
                <Input
                  placeholder="Ваше имя"
                  required
                  size='large'
                />
              </Form.Item>
              <Form.Item label="Ваш номер телефона" name="phone"  rules={[
                {
                  required: true,
                  message: 'Укажите свой телефонный номер для связи',
                },
              ]}>
                <Input
                  placeholder="+7**********"
                  required
                  size='large'
                />
              </Form.Item>
              <Form.Item label="Ваше сообщение" name="message">
                <TextArea
                  style={{width: '100%'}}
                  autoSize={{minRows: 2, maxRows: 6}}
                  size='large'
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" disabled={!submittable} onClick={handleSubmit}>Отправить сообщение</Button></Form.Item>
            </Form>
          )}
        </div>
      </Col>
    </Row>
  </section>
}

export default ContactForm;
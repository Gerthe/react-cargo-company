import React from 'react';
import { Button, Input } from 'antd';

const Settings = () => {
  const warehouses = [
    {
      id: 'ALMATY1',
      location: 'Алматы',
    },
  ];

  const saveLinks = () => {
    console.log('update links');
  };

  return (
    <div>
      <div>
        <h3>Склады</h3>
        {warehouses.map((warehouse) => (
          <div
            key={warehouse.id}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              margin: '10px 0',
            }}
          >
            {warehouse.location} ({warehouse.id})
          </div>
        ))}
      </div>
      <div>
        <h3>Ссылки</h3>
        <Input key="tiktok" placeholder="TikTok" />
        <Input key="instagram" placeholder="Instagram" />
        <Input key="telegram" placeholder="Telegram" />
        <Input key="phone" placeholder="Телефон" />
        <Input key="email" placeholder="Email" />

        <Button disabled type="primary" onClick={saveLinks}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default Settings;

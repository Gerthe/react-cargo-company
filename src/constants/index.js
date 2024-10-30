export const SHIPMENT_STATUSES = {
  CREATED: 'created',
  CHINA_WAREHOUSE: 'china_warehouse',
  CHINA_WAREHOUSE_SENT: 'china_warehouse_sent',
  ALMATY_WAREHOUSE: 'almaty_warehouse',
  TRANSIT: 'transit',
  LOCAL_WAREHOUSE: 'local_warehouse',
  DELIVERED: 'delivered',
};

export const SHIPMENT_STATUSES_ORDERED = [
  SHIPMENT_STATUSES.CREATED,
  SHIPMENT_STATUSES.CHINA_WAREHOUSE,
  SHIPMENT_STATUSES.CHINA_WAREHOUSE_SENT,
  SHIPMENT_STATUSES.ALMATY_WAREHOUSE,
  SHIPMENT_STATUSES.TRANSIT,
  SHIPMENT_STATUSES.LOCAL_WAREHOUSE,
  SHIPMENT_STATUSES.DELIVERED,
];

export const SHIPMENT_STATUSES_ORDERED_DEFAULT = [
  SHIPMENT_STATUSES.CREATED,
  SHIPMENT_STATUSES.CHINA_WAREHOUSE,
  SHIPMENT_STATUSES.CHINA_WAREHOUSE_SENT,
  SHIPMENT_STATUSES.ALMATY_WAREHOUSE,
  SHIPMENT_STATUSES.DELIVERED,
];

export const SHIPMENT_STATUSES_MAP = {
  [SHIPMENT_STATUSES.CREATED]: {
    title: 'Создан',
    color: 'green',
  },
  [SHIPMENT_STATUSES.CHINA_WAREHOUSE]: {
    title: 'На складе в Китае',
    color: 'orange',
  },
  [SHIPMENT_STATUSES.CHINA_WAREHOUSE_SENT]: {
    title: 'Отправлен из Китая',
    color: 'blue',
  },
  [SHIPMENT_STATUSES.ALMATY_WAREHOUSE]: {
    title: 'На складе в Алматы',
    color: 'cyan',
  },
  [SHIPMENT_STATUSES.TRANSIT]: {
    title: 'В пути',
    color: 'geekblue',
  },
  [SHIPMENT_STATUSES.LOCAL_WAREHOUSE]: {
    title: 'На местном складе',
    color: 'purple',
  },
  [SHIPMENT_STATUSES.DELIVERED]: {
    title: 'Доставлен',
    color: 'red',
  },
};

export const WAREHOUSES = [
  {
    location: 'ALMATY1',
    title: 'Алматы',
    address: 'tbd',
  },
];

export const DEFAULT_LOCATION = 'ALMATY1';

import { shipmentModel as Shipment } from '../models/shipmentModel.js';

export const createShipment = async (req, res) => {
  const { userId, code, description } = req.body;
  try {
    const newShipment = await Shipment.createShipment(
      userId,
      code,
      description
    );
    res.status(201).json(newShipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getShipment = async (req, res) => {
  const { id } = req.params;
  try {
    const shipment = await Shipment.getShipmentById(id);
    if (shipment) {
      res.json(shipment);
    } else {
      res.status(404).json({ message: 'Shipment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getShipmentsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const shipments = await Shipment.getAllShipmentsByUserId(userId);
    if (shipments) {
      res.json(shipments);
    } else {
      res.status(404).json({ message: 'Shipments not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.getAllShipments();
    if (shipments) {
      res.json(shipments);
    } else {
      res.status(404).json({ message: 'Shipments not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

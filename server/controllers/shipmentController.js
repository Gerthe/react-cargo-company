import shipmentModel from '../models/shipmentModel.js';
import logModel from '../models/logModel.js';

export const createShipment = async (req, res) => {
  const { userId, code, description } = req.body;
  try {
    const newShipment = await shipmentModel.createShipment(
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
    const shipment = await shipmentModel.getShipmentById(id);
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
    const shipments = await shipmentModel.getAllShipmentsByUserId(userId);
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
    const shipments = await shipmentModel.getAllShipments();
    if (shipments) {
      res.json(shipments);
    } else {
      res.status(404).json({ message: 'Shipments not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateShipmentStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const results = await shipmentModel.updateShipmentStatus(id, status);
    console.log(results);
    if (results) {
      await logModel.log({
        shipment_id: id,
        admin_id: 1,
        previous_status: results[0].status,
        new_status: status,
      });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
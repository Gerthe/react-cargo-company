import shipmentModel from '../models/shipmentModel.js';
import logModel from '../models/logModel.js';
import userModel from '../models/userModel.js';

export const createShipment = async (req, res) => {
  const { trackingCode, description } = req.body;
  try {
    const userId = req.user.id;
    const newShipment = await shipmentModel.createShipment(
      userId,
      trackingCode,
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
    const userId = req.user.id;
    const user = await userModel.getUserById(userId);
    const filter = req.query;
    let shipments;

    if (user.role === 'admin') {
      shipments = await shipmentModel.getAllShipments(filter);
    } else {
      filter.userId = userId;
      shipments = await shipmentModel.getShipments(filter);
    }

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
    const shipment = await shipmentModel.getShipmentById(id);
    const previousStatus = shipment.status || 'empty';
    const results = await shipmentModel.updateShipmentStatus(id, status);

    if (results) {
      await logModel.log({
        shipmentId: id,
        adminId: 1,
        prevStatus: previousStatus,
        newStatus: status,
      });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getShipmentsByStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.params;
    let shipments;

    if (status === 'active') {
      shipments = await shipmentModel.getUserActiveShipments(userId);
    } else {
      shipments = await shipmentModel.getUserInactiveShipments(userId);
    }

    if (shipments) {
      res.json(shipments);
    } else {
      res.status(404).json({ message: 'Shipments not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteShipment = async (req, res) => {
  const { id } = req.params;
  try {
    const shipment = await shipmentModel.getShipmentById(id);
    const userId = req.user.id;
    const user = await userModel.getUserById(userId);

    if (user.role !== 'admin' && shipment.userId !== userId) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this shipment' });
    }

    if (shipment.status !== 'created') {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this shipment' });
    }

    const results = await shipmentModel.deleteShipment(id);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

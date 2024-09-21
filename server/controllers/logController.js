import logModel from '../models/logModel.js';

export const log = async (req, res) => {
  const { shipmentId, adminId, prevStatus, newStatus } = req.body;
  try {
    const newLog = await logModel.log({
      shipmentId,
      adminId,
      prevStatus,
      newStatus,
    });
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLogsByShipmentId = async (req, res) => {
  const { shipmentId } = req.params;
  try {
    const logs = await logModel.getLogsByShipmentId(shipmentId);
    if (logs) {
      res.json(logs);
    } else {
      res.status(404).json({ message: 'Logs not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllLogs = async (req, res) => {
  try {
    const logs = await logModel.getAllLogs();
    if (logs) {
      res.json(logs);
    } else {
      res.status(404).json({ message: 'Logs not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

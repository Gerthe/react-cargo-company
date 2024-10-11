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
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order || 'DESC';
    const filters = req.query.filter || {};
    const pagination = { page, limit, sortBy, order };
    const searchValue = req.query.search || '';

    const logs = await logModel.getLogs(filters, pagination, searchValue);

    const total = await logModel.getTotalCount(filters, searchValue);
    const totalPages = Math.ceil(total / limit);

    res.json({
      data: logs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching logs:', error.message);
    res.status(500).json({ error: error.message });
  }
};

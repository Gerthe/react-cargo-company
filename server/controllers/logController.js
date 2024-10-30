import logModel from '../models/logModel.js';
import { fetchWithPagination } from '../services/genericService.js';

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
    const filters = req.query.filter || {};
    const searchValue = req.query.search || '';
    const pagination = { page, limit };

    const { data, total, totalPages } = await fetchWithPagination(
      logModel,
      filters,
      pagination,
      null,
      searchValue
    );

    console.log(total, totalPages);

    res.json({
      data,
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

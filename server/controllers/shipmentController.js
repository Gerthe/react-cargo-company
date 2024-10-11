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

export const getAllShipments = async (req, res) => {
  try {
    // Extract query parameters
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order || 'DESC';

    // Extract filters (assuming filter parameters are sent as filter[key]=value)
    const filters = req.query.filter || {};

    // Prepare pagination and sorting objects
    const pagination = { page, limit, sortBy, order };
    const sorting = { sortBy, order };

    // Extract search value
    const searchValue = req.query.search || '';

    // Fetch shipments based on filters, pagination, and sorting
    const shipments = await shipmentModel.getShipments(
      filters,
      pagination,
      sorting,
      searchValue
    );

    // Fetch total count for pagination
    const total = await shipmentModel.getTotalCount(filters, searchValue);
    const totalPages = Math.ceil(total / limit);

    // Respond with standardized success response
    res.json({
      data: shipments,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching shipments:', error.message);
    // Respond with standardized error response
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

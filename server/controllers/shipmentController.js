import shipmentModel from '../models/shipmentModel.js';
import logModel from '../models/logModel.js';
import userModel from '../models/userModel.js';

export const createShipment = async (req, res) => {
  try {
    const { trackingCode, description, arrivalDate, adminNote, deliverTo } =
      req.body;
    const user = await userModel.getUserById(req.user.id);

    if (user.role !== 'admin' && (!trackingCode || !description)) {
      return res.status(400).json({ message: 'MISSING_FIELDS' });
    }

    const existentShipment =
      await shipmentModel.getShipmentByTrackingCode(trackingCode);

    if (existentShipment && existentShipment.userId) {
      return res.status(409).json({ message: 'SHIPMENT_EXISTS' });
    }

    if (existentShipment && existentShipment.userId === null) {
      const updatedShipment = await shipmentModel.claim(
        existentShipment.id,
        user.id
      );
      return res.status(201).json(updatedShipment);
      //We want to claim the shipment by current user
    } else {
      const shipmentData = {
        trackingCode,
        description: user.role === 'admin' ? '' : description,
        arrivalDate: user.role === 'admin' ? arrivalDate : null,
        adminNote: user.role === 'admin' ? adminNote : null,
        claimed: 0,
        deliverTo,
        userId: user.role === 'admin' ? null : user.id,
        status:
          user.role === 'admin'
            ? shipmentModel.statuses.CHINA_WAREHOUSE
            : shipmentModel.statuses.CREATED,
        createdBy: user.id,
      };

      const newShipment = await shipmentModel.createShipment(shipmentData);

      res.status(201).json(newShipment);
    }
  } catch (error) {
    console.error('Error creating shipment:', error.message);
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
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order || 'DESC';

    const filters = req.query.filter || {};

    const pagination = { page, limit, sortBy, order };
    const sorting = { sortBy, order };

    const searchValue = req.query.search || '';

    const shipments = await shipmentModel.getShipments(
      filters,
      pagination,
      sorting,
      searchValue
    );

    const total = await shipmentModel.getTotalCount(filters, searchValue);
    const totalPages = Math.ceil(total / limit);

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
    res.status(500).json({ error: error.message });
  }
};

export const updateShipmentStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const shipment = await shipmentModel.getShipmentById(id);
    const previousStatus = shipment.status || 'empty';
    const results = await shipmentModel.updateShipmentStatus(id, status);

    if (results) {
      await logModel.log({
        shipmentId: id,
        adminId: userId,
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

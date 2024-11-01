import express from 'express';
import {
  createShipment,
  deleteShipment,
  getAllShipments,
  getShipment,
  getShipmentsByStatus,
  updateShipment,
  updateShipmentStatus,
} from '../controllers/shipmentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createShipment);
router.get('/:id', authMiddleware, getShipment);
router.put('/:id', authMiddleware, updateShipment);
router.get('/', authMiddleware, getAllShipments);
router.get('/status/:status', authMiddleware, getShipmentsByStatus);
router.delete('/:id', authMiddleware, deleteShipment);
router.patch('/:id/status', authMiddleware, updateShipmentStatus);

export default router;

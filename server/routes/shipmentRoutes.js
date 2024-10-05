import express from 'express';
import {
  createShipment,
  deleteShipment,
  getAllShipments,
  getShipment,
  getShipmentsByStatus,
  getShipmentsByUserId,
  updateShipmentStatus,
} from '../controllers/shipmentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createShipment);
router.get('/:id', authMiddleware, getShipment);
router.get('/user/:userId', authMiddleware, getShipmentsByUserId);
router.get('/', authMiddleware, getAllShipments);
router.post('/update/:id', authMiddleware, updateShipmentStatus);
router.get('/status/:status', authMiddleware, getShipmentsByStatus);
router.delete('/:id', authMiddleware, deleteShipment);

export default router;

import express from 'express';
import {
  createShipment,
  getAllShipments,
  getShipment,
  getShipmentsByUserId,
  updateShipmentStatus,
} from '../controllers/shipmentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, createShipment);
router.get('/:id', authMiddleware, getShipment);
router.get('/user/:userId', authMiddleware, getShipmentsByUserId);
router.get('/', authMiddleware, getAllShipments);
router.post('/update/:id', authMiddleware, updateShipmentStatus);

export default router;

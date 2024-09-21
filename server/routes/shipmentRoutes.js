import express from 'express';
import {
  createShipment,
  getAllShipments,
  getShipment,
  getShipmentsByUserId,
  updateShipmentStatus,
} from '../controllers/shipmentController.js';

const router = express.Router();

router.post('/add', createShipment);
router.post('/:id', getShipment);
router.get('/user/:userId', getShipmentsByUserId);
router.get('/', getAllShipments);
router.post('/update/:id', updateShipmentStatus);

export default router;

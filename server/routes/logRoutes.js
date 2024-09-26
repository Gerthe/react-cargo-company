import express from 'express';
import {
  getAllLogs,
  getLogsByShipmentId,
} from '../controllers/logController.js';

const router = express.Router();

router.get('/', getAllLogs);
router.get('/:shipmentId', getLogsByShipmentId);

export default router;

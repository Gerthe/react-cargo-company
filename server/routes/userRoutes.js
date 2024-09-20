import express from 'express';
import {
  registerUser,
  getUser,
  getAllUsers,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
export default router;

import express from 'express';
import {
  registerUser,
  getUser,
  getAllUsers,
  login,
  getUserInfo,
} from '../controllers/userController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/', authMiddleware, getAllUsers);
router.get('/me', authMiddleware, getUserInfo);
router.get('/:id', authMiddleware, getUser);

router.post('/login', login);

export default router;

import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { phone, password, name } = req.body;
  try {
    const existingUser = await userModel.getUserByPhone(phone);

    if (existingUser) {
      return res.status(409).json({ message: 'USER_EXISTS' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.createUser(phone, hashedPassword, name);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    if (users) {
      res.json(users);
    } else {
      res.status(404).json({ message: 'Users not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await userModel.getUserByPhone(phone);

    if (!user) {
      return res.status(404).json({ message: 'INVALID_PHONE' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'INVALID_CREDENTIALS' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    const userPublic = {
      id: user.id,
      phone: user.phone,
      role: user.role,
    };

    res.json({ token, user: userPublic });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

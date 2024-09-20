import userModel from '../models/userModel.js';

export const registerUser = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const newUser = await userModel.createUser(phone, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};

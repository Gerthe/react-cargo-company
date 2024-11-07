import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fetchWithPagination } from '../services/genericService.js';
import smsApi from '../services/smsc.js';
import resetCodeModel from '../models/resetCodeModel.js';

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000); // 6-значный код
}

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

export const getUserInfo = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await userModel.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'ee found ' + userId });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Extract query parameters (filters, pagination, sorting, search)
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order || 'DESC';
    const filters = req.query.filter || {};
    const searchValue = req.query.search || '';

    // Prepare pagination and sorting
    const pagination = { page, limit };
    const sorting = { sortBy, order };

    // Use the generic service to fetch data
    const { data, total, totalPages } = await fetchWithPagination(
      userModel,
      filters,
      pagination,
      sorting,
      searchValue
    );

    // Respond with the fetched users
    res.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      name: user.name,
    };

    res.json({ token, user: userPublic });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { phone } = req.body;
    const code = generateCode();
    const expirationTime = Date.now() + 30 * 60 * 1000; // Код действителен 30 минут
    const user = await userModel.getUserByPhone(phone);

    if (!user) {
      return res.status(404).json({ error: 'USER_NOT_FOUND' });
    }

    const existedCode = await resetCodeModel.get(phone);

    if (existedCode) {
      if (existedCode.expirationTime > Date.now()) {
        return res.status(400).json({ error: 'RESET_CODE_ALREADY_SENT' });
      } else {
        await resetCodeModel.delete(phone);
      }
    }

    await resetCodeModel.add(phone, code, expirationTime);

    smsApi.sendTelegramCode(
      '+7' + phone,
      code,
      (result, rawResponse, error, errorCode) => {
        console.log('Send: ', '+7' + phone, code);
        if (error) {
          console.error(
            `Ошибка отправки сообщения: ${error} (Код ошибки: ${errorCode})`
          );
          console.log('Ответ сервера:', rawResponse);
        } else {
          console.log(`Сообщение успешно отправлено: ${result}`);
        }
      }
    );

    res.status(200).json({ status: true, message: 'RESET_LINK_SENT' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { phone, resetCode, password } = req.body;

    if (!phone || !resetCode || !password) {
      return res.status(400).json({ error: 'Недостаточно данных' });
    }

    const result = await resetCodeModel.check(phone, resetCode);

    if (result.length === 0 || Date.now() > result[0].expirationTime) {
      return res
        .status(400)
        .json({ error: 'RESET_CODE_IS_EXPIRED_OR_INVALID' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updated = await userModel.updatePassword(phone, hashedPassword);

    if (updated) {
      await resetCodeModel.delete(phone);
      res.json({ message: 'Пароль успешно обновлён' });
    } else {
      res.status(500).json({ error: 'Ошибка обновления пароля' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

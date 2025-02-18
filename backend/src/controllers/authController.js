import { Admin } from '../models/index.js';
import bcrypt from 'bcryptjs';

// Функция для создания админа (запускать только один раз при инициализации)
export const initializeAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({
        username: 'admin',
        password: hashedPassword
      });
      console.log('Admin account created successfully');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};

export const login = async (request, reply) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply.code(400).send({ error: 'Username and password are required' });
    }

    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const token = await reply.jwtSign({ 
      id: admin.id,
      username: admin.username
    });

    return { token };
  } catch (error) {
    request.log.error('Error in login:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

export const checkAuth = async (request, reply) => {
  try {
    const admin = await Admin.findOne({ 
      where: { username: request.user.username }
    });
    
    if (!admin) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    return { 
      authenticated: true, 
      user: { 
        id: admin.id,
        username: admin.username 
      } 
    };
  } catch (error) {
    request.log.error('Error in checkAuth:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};
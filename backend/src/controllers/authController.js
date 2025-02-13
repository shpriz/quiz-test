import { Admin } from '../models/index.js';
import { hashPassword, comparePassword } from '../utils/auth.js';

// Функция для создания админа (запускать только один раз при инициализации)
export const initializeAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      const hashedPassword = await hashPassword('admin123'); // Измените на более безопасный пароль
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
      request.log.info('Login failed: missing credentials');
      return reply.code(400).send({ error: 'Username and password are required' });
    }

    const admin = await Admin.findOne({ where: { username } });
    
    if (!admin) {
      request.log.info('Login failed: user not found');
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await comparePassword(password, admin.password);
    
    if (!isPasswordValid) {
      request.log.info('Login failed: invalid password');
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    request.log.info('Login successful');
    const token = await reply.jwtSign(
      { 
        role: 'admin',
        username: admin.username,
        id: admin.id
      },
      { expiresIn: '1h' }
    );

    return { 
      token,
      user: {
        username: admin.username,
        role: 'admin'
      }
    };
  } catch (error) {
    request.log.error('Login error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

// Эндпоинт для проверки текущего токена
export const checkAuth = async (request, reply) => {
  try {
    // Токен уже проверен middleware
    const user = request.user;
    return { 
      user: {
        username: user.username,
        role: user.role
      }
    };
  } catch (error) {
    request.log.error('Check auth error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};
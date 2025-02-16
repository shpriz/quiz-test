import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import routes from './routes/index.js';
import adminRoutes from './routes/admin.js';
import { initializeAdmin } from './controllers/authController.js';

dotenv.config();

const fastify = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  }
});

// Регистрируем плагины
await fastify.register(cors, {
  origin: true,
  credentials: true
});

await fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'your-secret-key'
});

// Регистрируем маршруты
await fastify.register(routes);
await fastify.register(adminRoutes, { prefix: '/api' });

// Подключение к базе данных
try {
  await sequelize.authenticate();
  fastify.log.info('Database connected successfully.');
  
  // Синхронизация моделей
  await sequelize.sync({ alter: true });
  fastify.log.info('Database models synchronized.');

  // Инициализация админа
  await initializeAdmin();
  fastify.log.info('Admin initialization completed.');
} catch (error) {
  fastify.log.error('Unable to connect to the database:', error);
  process.exit(1);
}

const start = async () => {
  try {
    const port = process.env.PORT || 5000;
    const host = '0.0.0.0';
    
    await fastify.listen({ port, host });
    fastify.log.info(`Server is running on http://${host}:${port}`);
  } catch (error) {
    fastify.log.error('Error starting server:', error);
    process.exit(1);
  }
};

start();
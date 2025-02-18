import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { sequelize } from './models/index.js';
import { registerRoutes } from './routes/index.js';

const fastify = Fastify({
  logger: true
});

// Регистрируем плагины
fastify.register(cors, {
  origin: true,
  credentials: true
});

fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'quiz_jwt_secret_key_2024'
});

// Регистрируем маршруты
registerRoutes(fastify);

// Запускаем сервер
const start = async () => {
  try {
    // Проверяем подключение к БД
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Синхронизируем модели с БД
    await sequelize.sync();
    console.log('Database models synchronized successfully.');

    // Запускаем сервер
    await fastify.listen({ 
      port: process.env.PORT || 5000,
      host: '0.0.0.0'
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

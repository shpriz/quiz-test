import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import routes from './routes/index.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const fastify = Fastify({
  logger: true
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
  console.log('Database connected.');
  await sequelize.sync();
  console.log('Database synchronized.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
  process.exit(1);
}

const start = async () => {
  try {
    await fastify.listen({ port: 5000, host: '0.0.0.0' });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
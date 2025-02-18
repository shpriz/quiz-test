import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(
  process.env.DB_NAME || 'quiz_db',
  process.env.DB_USER || 'quiz_admin',
  process.env.DB_PASSWORD || 'Quiz123Admin!',
  {
    host: process.env.DB_HOST || 'mariadb',
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mariadb',
    logging: console.log
  }
);

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Импортируем модели
import { Result } from './Result.js';
import { SectionScore } from './SectionScore.js';
import { DetailedAnswer } from './DetailedAnswer.js';
import { Admin } from './Admin.js';
import { Section } from './Section.js';
import { Question } from './Question.js';
import { User } from './User.js';

dotenv.config();

// Создаем инстанс Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-3',
    },
  }
);

// Экспортируем модели
export {
  Result,
  SectionScore,
  DetailedAnswer,
  Admin,
  Section,
  Question,
  User,
  sequelize
};
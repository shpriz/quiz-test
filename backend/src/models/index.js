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

// Импортируем модели после создания sequelize
import { Result } from './Result.js';
import { SectionScore } from './SectionScore.js';
import { DetailedAnswer } from './DetailedAnswer.js';
import { Section } from './Section.js';
import { Question } from './Question.js';
import { Admin } from './Admin.js';

// Определяем ассоциации
Result.hasMany(SectionScore);
SectionScore.belongsTo(Result);

Result.hasMany(DetailedAnswer);
DetailedAnswer.belongsTo(Result);

Section.hasMany(Question);
Question.belongsTo(Section);

// Экспортируем модели
export {
  Result,
  SectionScore,
  DetailedAnswer,
  Section,
  Question,
  Admin
};
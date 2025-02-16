import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Импортируем модели
import { Result } from './Result.js';
import { SectionScore } from './SectionScore.js';
import { DetailedAnswer } from './DetailedAnswer.js';
import { Section } from './Section.js';
import { Question } from './Question.js';

dotenv.config();

// Создаем инстанс Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-3',
    },
  }
);

// Определяем связи между моделями
Result.hasMany(SectionScore);
SectionScore.belongsTo(Result);

SectionScore.hasMany(DetailedAnswer);
DetailedAnswer.belongsTo(SectionScore);

Question.belongsTo(Section);
Section.hasMany(Question);

// Экспортируем модели
export {
  Result,
  SectionScore,
  DetailedAnswer,
  Section,
  Question,
  sequelize
};
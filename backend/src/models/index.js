import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { Result } from './Result.js';
import { SectionScore } from './SectionScore.js';
import { DetailedAnswer } from './DetailedAnswer.js';
import { Section } from './Section.js';
import { Question } from './Question.js';
import { Admin } from './Admin.js';

dotenv.config();

// Создаем инстанс Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'quizz_db',
  process.env.DB_USER || 'quiz_user',
  process.env.DB_PASSWORD || 'quiz_password',
  {
    host: process.env.DB_HOST || 'mariadb',
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mariadb',
    logging: console.log
  }
);

// Определяем связи между моделями
Result.hasMany(SectionScore, { foreignKey: 'resultId' });
SectionScore.belongsTo(Result, { foreignKey: 'resultId' });

SectionScore.hasMany(DetailedAnswer, { foreignKey: 'sectionScoreId' });
DetailedAnswer.belongsTo(SectionScore, { foreignKey: 'sectionScoreId' });

Question.belongsTo(Section, { foreignKey: 'sectionId' });
Section.hasMany(Question, { foreignKey: 'sectionId' });

// Экспортируем модели и sequelize
export {
  Result,
  SectionScore,
  DetailedAnswer,
  Section,
  Question,
  Admin,
  sequelize
};
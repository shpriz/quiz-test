import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

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
    dialectOptions: {
      timezone: 'Etc/GMT-3',
    },
    logging: console.log
  }
);

// Импортируем модели
import { Result } from './Result.js';
import { SectionScore } from './SectionScore.js';
import { DetailedAnswer } from './DetailedAnswer.js';
import { Section } from './Section.js';
import { Question } from './Question.js';
import { Admin } from './Admin.js';

// Определяем связи между моделями
Result.hasMany(SectionScore, { as: 'sectionScores', foreignKey: 'resultId' });
SectionScore.belongsTo(Result, { foreignKey: 'resultId' });

SectionScore.hasMany(DetailedAnswer, { as: 'answers', foreignKey: 'sectionScoreId' });
DetailedAnswer.belongsTo(SectionScore, { foreignKey: 'sectionScoreId' });

Question.belongsTo(Section, { foreignKey: 'sectionId' });
Section.hasMany(Question, { as: 'questions', foreignKey: 'sectionId' });

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
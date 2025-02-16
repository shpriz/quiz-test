import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Создаем инстанс Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-3',
    },
  }
);

// Импортируем модели
import { Result } from './Result.js';
import { SectionScore } from './SectionScore.js';
import { DetailedAnswer } from './DetailedAnswer.js';
import { Section } from './Section.js';
import { Question } from './Question.js';

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
  sequelize
};
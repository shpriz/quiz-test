import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Импортируем функции создания моделей
import createResultModel from './Result.js';
import createSectionScoreModel from './SectionScore.js';
import createDetailedAnswerModel from './DetailedAnswer.js';
import createAdminModel from './Admin.js';
import createSectionModel from './Section.js';
import createQuestionModel from './Question.js';

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

// Инициализируем модели
const Result = createResultModel(sequelize);
const SectionScore = createSectionScoreModel(sequelize);
const DetailedAnswer = createDetailedAnswerModel(sequelize);
const Admin = createAdminModel(sequelize);
const Section = createSectionModel(sequelize);
const Question = createQuestionModel(sequelize);

// Определяем связи
Result.hasMany(SectionScore, {
  foreignKey: 'resultId',
  as: 'sectionScores'
});

Result.hasMany(DetailedAnswer, {
  foreignKey: 'resultId',
  as: 'detailedAnswers'
});

Section.hasMany(Question, {
  foreignKey: 'sectionId',
  as: 'questions'
});

Question.belongsTo(Section, {
  foreignKey: 'sectionId'
});

SectionScore.belongsTo(Result, {
  foreignKey: 'resultId'
});

DetailedAnswer.belongsTo(Result, {
  foreignKey: 'resultId'
});

export {
  sequelize,
  Result,
  SectionScore,
  DetailedAnswer,
  Admin,
  Section,
  Question
};
// Импортируем модели
import { Result } from './Result.js';
import { SectionScore } from './SectionScore.js';
import { DetailedAnswer } from './DetailedAnswer.js';
import { Section } from './Section.js';
import { Question } from './Question.js';
import { Admin } from './Admin.js';

// Определяем ассоциации после импорта всех моделей
const initializeAssociations = () => {
  Result.hasMany(SectionScore);
  SectionScore.belongsTo(Result);

  Result.hasMany(DetailedAnswer);
  DetailedAnswer.belongsTo(Result);

  Section.hasMany(Question);
  Question.belongsTo(Section);
};

// Инициализируем ассоциации
initializeAssociations();

// Экспортируем модели
export * from '../db.js';
export {
  Result,
  SectionScore,
  DetailedAnswer,
  Section,
  Question,
  Admin
};
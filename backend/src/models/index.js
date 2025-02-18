import { sequelize } from '../db.js';
import { Admin } from './Admin.js';
import { Result } from './Result.js';
import { SectionScore } from './SectionScore.js';
import { DetailedAnswer } from './DetailedAnswer.js';
import { Section } from './Section.js';
import { Question } from './Question.js';

// Определяем ассоциации
Result.hasMany(SectionScore);
SectionScore.belongsTo(Result);

Result.hasMany(DetailedAnswer);
DetailedAnswer.belongsTo(Result);

Section.hasMany(Question);
Question.belongsTo(Section);

export {
  sequelize,
  Admin,
  Result,
  SectionScore,
  DetailedAnswer,
  Section,
  Question
};
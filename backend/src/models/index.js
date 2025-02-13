import Result from './Result.js';
import SectionScore from './SectionScore.js';
import DetailedAnswer from './DetailedAnswer.js';
import Admin from './Admin.js';
import Section from './Section.js';
import Question from './Question.js';



// Определение связей
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

export {
  Section,
  Question,
  // ... остальные экспорты ...
};
SectionScore.belongsTo(Result, {
  foreignKey: 'resultId'
});

DetailedAnswer.belongsTo(Result, {
  foreignKey: 'resultId'
});

export {
  Result,
  SectionScore,
  DetailedAnswer,
  Admin
};
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const DetailedAnswer = sequelize.define('DetailedAnswer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  resultId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'result_id'
  },
  sectionTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'section_title'
  },
  questionText: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'question_text'
  },
  answerText: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'answer_text'
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'detailed_answers',
  timestamps: false
});

export default DetailedAnswer;
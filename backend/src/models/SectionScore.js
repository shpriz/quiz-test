import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const SectionScore = sequelize.define('SectionScore', {
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
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  maxScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'max_score'
  }
}, {
  tableName: 'section_scores',
  timestamps: false
});

export default SectionScore;
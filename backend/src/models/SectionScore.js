import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const SectionScore = sequelize.define('SectionScore', {
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
  }
}, {
  tableName: 'section_scores',
  timestamps: true
});
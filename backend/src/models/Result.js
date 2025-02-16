import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Result = sequelize.define('Result', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name'
  },
  totalScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'total_score'
  },
  answers: {
    type: DataTypes.JSON
  },
  completionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'completion_date'
  }
}, {
  tableName: 'results',
  timestamps: false
});
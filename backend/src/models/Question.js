import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answers: {
      type: DataTypes.JSON,
      allowNull: false
    },
    scores: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    tableName: 'questions',
    timestamps: false
  });

  Question.associate = (models) => {
    Question.belongsTo(models.Section, {
      foreignKey: 'sectionId'
    });
  };

  return Question;
};
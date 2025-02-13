import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Section = sequelize.define('Section', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'sections',
    timestamps: false
  });

  Section.associate = (models) => {
    Section.hasMany(models.Question, {
      foreignKey: 'sectionId',
      as: 'questions'
    });
  };

  return Section;
};
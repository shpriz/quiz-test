import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Создаем инстанс Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'quiz_db',
  process.env.DB_USER || 'quiz_admin',
  process.env.DB_PASSWORD || 'Quiz123Admin!',
  {
    host: process.env.DB_HOST || 'mariadb',
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mariadb',
    logging: console.log
  }
);

// Определяем модель Admin
const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, {
  hooks: {
    beforeCreate: async (admin) => {
      if (admin.password) {
        admin.password = await bcrypt.hash(admin.password, 10);
      }
    },
    beforeUpdate: async (admin) => {
      if (admin.changed('password')) {
        admin.password = await bcrypt.hash(admin.password, 10);
      }
    }
  }
});

Admin.prototype.checkPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Определяем остальные модели
const Result = sequelize.define('Result', {
  // ... определение модели Result
});

const SectionScore = sequelize.define('SectionScore', {
  // ... определение модели SectionScore
});

const DetailedAnswer = sequelize.define('DetailedAnswer', {
  // ... определение модели DetailedAnswer
});

const Section = sequelize.define('Section', {
  // ... определение модели Section
});

const Question = sequelize.define('Question', {
  // ... определение модели Question
});

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

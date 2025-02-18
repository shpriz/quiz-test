import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import bcrypt from 'bcryptjs';

export const Admin = sequelize.define('Admin', {
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
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'admin'
  },
  lastLogin: {
    type: DataTypes.DATE
  }
}, {
  hooks: {
    beforeCreate: async (admin) => {
      admin.password = await bcrypt.hash(admin.password, 10);
    },
    beforeUpdate: async (admin) => {
      if (admin.changed('password')) {
        admin.password = await bcrypt.hash(admin.password, 10);
      }
    }
  }
});

// Instance method to check password
Admin.prototype.checkPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};
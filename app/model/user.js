'use strict';

module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const User = app.model.define('user', {
    UserID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Password: {
      type: DataTypes.STRING(32),
      allowNull: true,
    }
  }, {
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'UserID' },
        ],
      },
    ],
  });

  return User;
};

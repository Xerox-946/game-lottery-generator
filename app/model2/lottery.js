'use strict';

module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const Lottery = app.Model2.define('sys_lottery', {
    LotteryID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    LotteryClassID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Param: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Grade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Odd:{
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'sys_lottery',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'LotteryID' },
        ],
      },
    ],
  });

  return Lottery;
};

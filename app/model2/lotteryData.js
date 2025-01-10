'use strict';

module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const LotteryData = app.Model2.define('sys_lottery_data', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    PlanID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ClassIDs: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    LotteryID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    HeroID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Quality: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    IsBd: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Odd: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    BdOdd: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    CreateTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    tableName: 'sys_lottery_data',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'ID' },
        ],
      },
    ],
  });

  return LotteryData;
};

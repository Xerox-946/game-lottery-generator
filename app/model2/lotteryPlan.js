'use strict';

module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const LotteryPlan = app.Model2.define('sys_lottery_plan', {
    PlanID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ClassID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    MergeIDs: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Params:{
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'sys_lottery_plan',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'PlanID' },
        ],
      },
    ],
  });

  return LotteryPlan;
};

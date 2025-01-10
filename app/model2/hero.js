'use strict';

module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const Hero = app.Model2.define('sys_hero', {
    HeroID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  }, {
    tableName: 'sys_hero',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'HeroID' },
        ],
      },
    ],
  });

  return Hero;
};

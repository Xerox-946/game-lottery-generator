'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },

  jwt: {
    enable: true,
    package: "egg-jwt"
  },
};

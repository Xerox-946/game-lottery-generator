/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1699427705883_8327';

  // add your middleware config here
  config.middleware = [];

  // XHN-TODO: 修改数据库配置
  // add your user config here
  config.sequelize = {
    datasources: [
      // {
      //   dialect: 'mysql',
      //   host: '192.168.19.231',
      //   port: 3306,
      //   username: 'halocenter',
      //   password: '123456QWEasd_',
      //   database: 'halo_center',
      //   timezone: '+08:00',
      //   pool: {
      //     max: 5,
      //     min: 0,
      //     acquire: 30000,
      //     idle: 10000,
      //   },
      //   define: {
      //     underscored: false,
      //     freezeTableName: true,
      //     timestamps: false,
      //     createdAt: false,
      //     updatedAt: false,
      //     deletedAt: false,
      //   },
      // },
      {
        delegate: 'Model2', 
        baseDir: 'model2',
        dialect: 'mysql',
        host: '192.168.19.230',
        port: 3306,
        username: 'xianghaonan',
        password: 'xianghaonan123',
        database: 'tendo_sys2',
        timezone: '+08:00',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        define: {
          underscored: false,
          freezeTableName: true,
          timestamps: false,
          createdAt: false,
          updatedAt: false,
          deletedAt: false,
        },
      },
    ]
  };

  config.security = {
    domainWhiteList: ['localhost'],
  };

  config.jwt = {
    secret: "kingsir418"//自定义 token 的加密条件字符串
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8080'],//允许访问接口的白名单
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.jwt = {
    secret: 'Kingsir',
  };

  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
// docker run --name mysql -e MYSQL ROOT_PASSWORD=123456 -p3306:3306 -v /home/hututu/mytest/mysql/conf: D:/docker_database/mysql/conf/ -v /home/hututu/mytest

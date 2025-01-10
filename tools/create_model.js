/**
 * 自动化工具之创建 model
 * 功能列表：
 * - 创建 model 文件
 */
const fs = require('fs');

const child_process = require('child_process');

console.log(`*** 开始创建 model ***\n`);

const args = process.argv.splice(2);
const name = args && args.length > 0 ? args[0].toLowerCase() : '';

if (!name) {
    return console.error(`[ERROR] 请在命令最后加上 model 名称，如：npm run m user\n* `);
}

console.log(`[Model Name] ${name}\n`);

const PATH_DIR = './app/model/';

const dbConfigPath = './config/envs/db/db.local.json'; // 读取配置

const dbConfig = JSON.parse(fs.readFileSync(dbConfigPath).toString());
const sequelizeOptions = './tools/sequelize_options.json';

const cmd = `sequelize-auto -h ${dbConfig.host} -d ${dbConfig.database} \
-u ${dbConfig.username} -x ${dbConfig.password} -o ${PATH_DIR} -p ${dbConfig.port} -c ${sequelizeOptions} -t ${name}`;

const res = child_process.execSync(cmd);
console.log(cmd)
const modelFile = `${PATH_DIR}${name}.js`;
let modelCode = fs.readFileSync(modelFile).toString();

const originalHeader = `const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(`;

const newHeader = `'use strict';
module.exports = (app) => {
  const { DataTypes } = app.Sequelize;
  const model = app.model.define(`;

modelCode = modelCode.replace(originalHeader, newHeader);

const modelContent = `    sequelize,
    tableName: '${name}',
    timestamps: false,`;


const newContent = `  tableName: '${name}',
  timestamps: false,`;
modelCode = modelCode.replace(modelContent, newContent);

const originalFooter = `  });
};`;
const newFooter = `  });
return model;
};`;


modelCode = modelCode.replace(originalFooter, newFooter);
fs.writeFileSync(modelFile, modelCode);
fs.unlinkSync("./app/model/init-models.js");
console.log(`${modelFile} 文件创建成功`);
'use strict'

const Service = require('egg').Service;

class User extends Service {
    async list() {
        const { app } = this;
        return await app.model.User.findAll();
    }

    // 通过用户名获取用户信息
    async getUserByName(username) {
        const { app } = this;
        try {
            const result = await app.model.User.findOne({ where: { Name: username } });
            return result.dataValues;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    //注册用户
    async register(username, password) {
        const { app } = this;
        try {
            const result = await app.model.User.create({ username: username, password: password, CreateTime: new Date().getTime() });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = User;
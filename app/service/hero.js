'use strict'

const Service = require('egg').Service;

class Hero extends Service {
    async list() {
        const { app } = this;
        return await app.Model2.Hero.findAll();
    }
}

module.exports = Hero;
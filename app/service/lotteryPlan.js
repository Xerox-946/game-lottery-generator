'use strict'

const Service = require('egg').Service;

class LotteryPlan extends Service {
    async list() {
        const { app } = this;
        return await app.Model2.LotteryPlan.findAll();
    }
}

module.exports = LotteryPlan;
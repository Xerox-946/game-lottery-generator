'use strict'

const Service = require('egg').Service;

class LotteryData extends Service {

    async allList() {
        const { app } = this;
        return await app.Model2.LotteryData.findAll();
    }

    async list(current,pageSize) {
        const { app } = this;
        const query = "SELECT * FROM `sys_lottery_data` limit "+(current-1)*pageSize+","+pageSize;
        const results = await app.Model2.query(query, {
            type: app.Sequelize.QueryTypes.SELECT,
        });
        return results;
    }

    async getQualityList(){
        const { app } = this;
        const query = "SELECT Quality, COUNT(*) AS Count,IsBd FROM `sys_lottery_data` GROUP BY Quality,IsBd";
        const results = await app.Model2.query(query, {
            type: app.Sequelize.QueryTypes.SELECT,
        });
        return results;
    }

    async getHeroDataList(){
        const { app } = this;
        const query = "SELECT HeroID, COUNT(*) AS Count,IsBd,Quality FROM `sys_lottery_data` GROUP BY HeroID,Quality,IsBd";
        const results = await app.Model2.query(query, {
            type: app.Sequelize.QueryTypes.SELECT,
        });
        return results;
    }
}

module.exports = LotteryData;
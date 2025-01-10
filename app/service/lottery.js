'use strict'

const Service = require('egg').Service;

class Lottery extends Service {
    async getTargetLottery(lotteryIDList) {
        const { app } = this;
        var lotteryIDs="";
        for(let i in lotteryIDList){
            lotteryIDs+=lotteryIDList[i]+",";
        }
        const query = "SELECT * FROM `sys_lottery` where Enabled=1 and LotteryClassID in (" + lotteryIDs.slice(0,-1) + ")";
        const results = await app.Model2.query(query, {
            type: app.Sequelize.QueryTypes.SELECT,
        });
        return results;
    }
}

module.exports = Lottery;
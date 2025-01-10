// app/controller/hero.js
const Controller = require('egg').Controller;
const selectPlat="http://192.168.19.230:10200";
const axios = require('axios');

function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}

class LotteryController extends Controller {
    async getTargetLottery() {
        const { ctx } = this;
        const lotteryIDList=ctx.request.body;
        const lotteryList = await ctx.service.lottery.getTargetLottery(lotteryIDList);
        if (lotteryList) {
            ctx.body = {
                code: 200,
                msg: '拉取成功！',
                result: lotteryList
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '注册失败',
                result: null
            }
        }
    }

    async startLottery() {
        const { ctx } = this;
        const { planID, count } = ctx.request.body;
        
        try {
            const response = await axios.get(selectPlat + '?Content={"Cmd":"api.simulateLottery","Params":{"PlanID":' + planID + ',"Times":' + count + ',"Type":"More"}}');            
            ctx.body = {
                code: 200,
                msg: '抽卡成功',
                result: response.data.Result
            };
        } catch (error) {
            console.error('Error calling API:', error);
            ctx.body = {
                code: 500,
                msg: '抽卡失败',
                error: error.message || '未知错误'
            };
        }
    }
    
}

module.exports = LotteryController;
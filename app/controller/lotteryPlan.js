// app/controller/hero.js
const Controller = require('egg').Controller;

function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}

class LotteryPlanController extends Controller {
    async getList() {
        const { ctx } = this;
        const lotteryPlanList = await ctx.service.lotteryPlan.list();

        if (lotteryPlanList) {
            ctx.body = {
                code: 200,
                msg: '拉取成功！',
                result: lotteryPlanList
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '注册失败',
                result: null
            }
        }
    }


}

module.exports = LotteryPlanController;
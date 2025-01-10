// app/controller/lotteryData.js
const Controller = require('egg').Controller;

function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}

class LotteryDataController extends Controller {
    async getList() {
        const { ctx } = this;
        const { current, pageSize } = ctx.request.body;
        var lotteryDataList=[];
        if(current!=undefined||pageSize!=undefined){
            lotteryDataList = await ctx.service.lotteryData.list(current, pageSize);
        }else{
            lotteryDataList = await ctx.service.lotteryData.allList();
        }

        if (lotteryDataList) {
            ctx.body = {
                code: 200,
                msg: '拉取成功！',
                result: lotteryDataList
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '拉取失败',
                result: null
            }
        }
    }

    async getQualityList() {
        const { ctx } = this;
        const qualityList = await ctx.service.lotteryData.getQualityList();
        if (qualityList) {
            ctx.body = {
                code: 200,
                msg: '拉取成功！',
                result: qualityList
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '拉取失败',
                result: null
            }
        }
    }

    async getHeroDataList() {
        const { ctx } = this;
        const heroList = await ctx.service.lotteryData.getHeroDataList();

        if (heroList) {
            ctx.body = {
                code: 200,
                msg: '拉取成功！',
                result: heroList
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '拉取失败',
                result: null
            }
        }
    }
}

module.exports = LotteryDataController;
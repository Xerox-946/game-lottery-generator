// app/controller/hero.js
const Controller = require('egg').Controller;

function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}

class HeroController extends Controller {
    async getList() {
        const { ctx } = this;
        const heroList = await ctx.service.hero.list();

        if (heroList) {
            ctx.body = {
                code: 200,
                msg: '拉取成功！',
                result: heroList
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

module.exports = HeroController;
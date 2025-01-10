// app/controller/plan.js
const Controller = require('egg').Controller;

class PlanController extends Controller {
  async getList() {
    const { ctx, service } = this;
    const data = await service.plan.readJSONFile();
    if (data) {
        ctx.body = {
            code: 200,
            msg: '拉取成功！',
            result: data
        }
    } else {
        ctx.body = {
            code: 500,
            msg: '注册失败',
            result: data
        }
    }
  }

  async addPlan() {
    const { ctx, service } = this;
    const newData = ctx.request.body;
    await service.plan.addPlan(newData);
    ctx.body = { success: true };
  }

  async delPlan() {
    const { ctx, service } = this;
    const ID = ctx.request.body;
    await service.plan.delPlan(ID.key);
    ctx.body = { success: true };
  }

  async updatePlan() {
    const { ctx, service } = this;
    const newData = ctx.request.body;
    await service.plan.updatePlan(newData);
    ctx.body = { success: true };
  }
}

module.exports = PlanController;

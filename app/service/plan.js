// app/service/file.js
const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

class PlanService extends Service {
  constructor(ctx) {
    super(ctx);
    this.filePath = path.join(this.app.baseDir, 'app/data/plan.json');
  }

  async readJSONFile() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
      } else {
        return [];
      }
    } catch (err) {
      this.ctx.logger.error('Error reading JSON file:', err);
      return [];
    }
  }

  async writeJSONFile(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
      this.ctx.logger.info('JSON file written successfully');
    } catch (err) {
      this.ctx.logger.error('Error writing JSON file:', err);
    }
  }

  async addPlan(newData) {
    const data = await this.readJSONFile();
    let maxId = data.length > 0 ? Math.max(...data.map(item => item.ID)) : 0;
    newData.ID = maxId + 1;
    data.push(newData);
    await this.writeJSONFile(data);
  }

  async delPlan(ID) {
    let data = await this.readJSONFile();
    data=data.filter(item => item.ID !== ID);
    await this.writeJSONFile(data);
  }

  async updatePlan(newData) {
    let data = await this.readJSONFile();
    Object.assign(data.filter(item => newData.ID === item.ID)[0], newData);
    await this.writeJSONFile(data);
  }
}

module.exports = PlanService;

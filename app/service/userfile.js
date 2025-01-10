// app/service/file.js
const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

class PlanService extends Service {
  constructor(ctx) {
    super(ctx);
    this.filePath = path.join(this.app.baseDir, 'app/data/user.json');
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

  async getUserByName(username) {
    const data = await this.readJSONFile();
    const userInfo=data.filter(item => username === item.Name)[0];
    return userInfo;
  }
}

module.exports = PlanService;

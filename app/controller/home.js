'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async sms() {
    const { ctx } = this;
    ctx.body = '1231';
  }
}

module.exports = HomeController;

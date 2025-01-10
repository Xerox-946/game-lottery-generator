// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportHero = require('../../../app/controller/hero');
import ExportHome = require('../../../app/controller/home');
import ExportLottery = require('../../../app/controller/lottery');
import ExportLotteryData = require('../../../app/controller/lotteryData');
import ExportLotteryPlan = require('../../../app/controller/lotteryPlan');
import ExportPlan = require('../../../app/controller/plan');
import ExportUser = require('../../../app/controller/user');
import ExportUserfile = require('../../../app/controller/userfile');

declare module 'egg' {
  interface IController {
    hero: ExportHero;
    home: ExportHome;
    lottery: ExportLottery;
    lotteryData: ExportLotteryData;
    lotteryPlan: ExportLotteryPlan;
    plan: ExportPlan;
    user: ExportUser;
    userfile: ExportUserfile;
  }
}

// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportHero = require('../../../app/service/hero');
import ExportLottery = require('../../../app/service/lottery');
import ExportLotteryData = require('../../../app/service/lotteryData');
import ExportLotteryPlan = require('../../../app/service/lotteryPlan');
import ExportPlan = require('../../../app/service/plan');
import ExportUser = require('../../../app/service/user');
import ExportUserfile = require('../../../app/service/userfile');

declare module 'egg' {
  interface IService {
    hero: AutoInstanceType<typeof ExportHero>;
    lottery: AutoInstanceType<typeof ExportLottery>;
    lotteryData: AutoInstanceType<typeof ExportLotteryData>;
    lotteryPlan: AutoInstanceType<typeof ExportLotteryPlan>;
    plan: AutoInstanceType<typeof ExportPlan>;
    user: AutoInstanceType<typeof ExportUser>;
    userfile: AutoInstanceType<typeof ExportUserfile>;
  }
}

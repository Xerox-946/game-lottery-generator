'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  router.get('/', controller.home.index);
  router.post('/user/register', controller.user.register);
  // router.post('/user/login', controller.user.login);
  router.post('/user/logout', controller.user.logout);
  router.post('/account/sms', controller.home.sms);
  router.post('/user/login', controller.userfile.login);

  // lottery  
  router.post('/lottery/lotteryData', controller.lotteryData.getList);
  router.post('/lottery/qualityData', controller.lotteryData.getQualityList);
  router.post('/lottery/heroData', controller.lotteryData.getHeroDataList);
  router.post('/lottery/lotteryPlan', controller.lotteryPlan.getList);
  router.post('/lottery/getTargetLottery', controller.lottery.getTargetLottery);
  router.post('/lottery/startLottery', controller.lottery.startLottery);


  //hero
  router.post('/getHero', controller.hero.getList);

  //plan
  router.get('/plan/getPlan', controller.plan.getList);
  router.post('/plan/pushPlan', controller.plan.addPlan);
  router.post('/plan/delPlan', controller.plan.delPlan);
  router.post('/plan/updatePlan', controller.plan.updatePlan);

  const _jwt = middleware.jwtErr(app.config.jwt.secret); 
  router.get('/user/info', _jwt, controller.user.info);
  // const User = app.model.User;
  // async function syncModels() {
  //   await User.sync({force: false})
  // }

  // app.ready(syncModels);
};

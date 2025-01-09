import { defineStore } from "pinia";
import { ref } from "vue";
import { apiRoute } from "@/api/main";
/*
ref() 就是 state 属性
computed() 就是 getters
function() 就是 actions
*/
export const lotteryStore = defineStore("lottery", () => {
  const lottery = ref({});

  function startLotterys(planID,count) {
    return new Promise((resolve, reject) => {
        http.post({
          url: apiRoute.startLottery,
          data: {
            planID:planID,
            count:count
          },
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        })
    });
  }

  function lotteryDatas(pagination) {
    return new Promise((resolve, reject) => {
        http.post({
          url: apiRoute.lotteryData,
          data: {
            ...pagination
          },
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        })
    });
  }

  function qualityDatas() {
    return new Promise((resolve, reject) => {
        http.post({
          url: apiRoute.qualityData,
          data: {},
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        })
    });
  }

  function heroDatas() {
    return new Promise((resolve, reject) => {
        http.post({
          url: apiRoute.heroData,
          data: {},
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        })
    });
  }

  function lotteryPlan() {
    return new Promise((resolve, reject) => {
        http.post({
          url: apiRoute.lotteryPlan,
          data: {},
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        })
    });
  }

  function getTargetLottery(classList) {
    return new Promise((resolve, reject) => {
        http.post({
          url: apiRoute.getTargetLottery,
          data: {
            ...classList
          },
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        })
    });
  }

  return { lottery, startLotterys, lotteryDatas, qualityDatas, heroDatas, lotteryPlan, getTargetLottery  };
});

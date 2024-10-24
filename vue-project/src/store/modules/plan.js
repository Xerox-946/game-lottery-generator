import { defineStore } from "pinia";
import { ref } from "vue";
import { apiRoute } from "@/api/main";
/*
ref() 就是 state 属性
computed() 就是 getters
function() 就是 actions
*/
export const planStore = defineStore("plan", () => {
  const plan = ref({});

  function planList() {
    return new Promise((resolve, reject) => {
        http.get({
          url: apiRoute.planList,
          data: {},
        }).then((res) => {
          resolve(res.result);
        }).catch((error) => {
          reject(error);
        })
    });
  }

  function planUpdate(planInfo) {
    return new Promise((resolve, reject) => {
        http.post({
          url: apiRoute.planUpdate,
          data: {
            ...planInfo
          },
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        })
    });
  }

  function planAdd(planInfo) {
    return new Promise((resolve, reject) => {
        http.post({
          url: apiRoute.planAdd,
          data: {
            ...planInfo
          },
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        })
    });
  }

  function planDel(key) {
    return new Promise((resolve, reject) => {
        http.post({
            url: apiRoute.planDel,
            data: {
                key
            },
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        })
    });
  }

  return { plan, planList, planUpdate, planAdd, planDel };
});

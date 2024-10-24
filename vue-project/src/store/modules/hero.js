import { defineStore } from "pinia";
import { ref } from "vue";
import { apiRoute } from "@/api/main";
/*
ref() 就是 state 属性
computed() 就是 getters
function() 就是 actions
*/
export const heroStore = defineStore("hero", () => {
  const hero = ref({});

  function getHeroList() {
    return new Promise((resolve, reject) => {
      http.post({
        url: apiRoute.getHeroList,
        data: {},
      }).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error)
      });
    });
  }

  return { hero, getHeroList };
});

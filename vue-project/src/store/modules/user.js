import { defineStore } from "pinia";
import { ref } from "vue";
import { hex_md5 } from "../../utils/md5";
import { apiRoute } from "@/api/main";
/*
ref() 就是 state 属性
computed() 就是 getters
function() 就是 actions
*/
export const userStore = defineStore("user", () => {
  const user = ref({});

  function userLogin(userInfo) {
    userInfo.password = hex_md5(userInfo.password);
    return new Promise((resolve, reject) => {
        http.post({
          url: apiRoute.userLogin,
          data: {
            ...userInfo,
          },
        }).then((res) => {
          resolve();
        }).catch((error) => {
          reject(error);
        })
    });
  }

  function register() {
    // do something
  }

  function logout() {
    // do something
  }

  return { user, userLogin, register, logout };
});

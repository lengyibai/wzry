import { defineStore } from "pinia";
import { FormData } from "@/api/interface/form";
import { login, userInfo } from "@/api/main/user/index";
import { AuthStore } from "./interface";
import switchStore from "./globalSwitch";
import router from "@/router";
import routesStore from "@/store/routes";

export default defineStore("auth", {
  state: (): AuthStore.State => ({
    userStatus: false, // 用户状态
    timer: 0, //实时检测帐号状态
    // 用户相关信息
    userInfo: {
      id: 0,
      password: "",
      name: "",
      headImg: "",
      wzryToken: "",
      role: 1,
    },
  }),

  actions: {
    /** @description: 登录 */
    async login(form: FormData.User) {
      switchStore().$loading.show("登录中");
      switchStore().$clickAudio("登录");
      login(form)
        .then((res) => {
          /* 登录成功 */
          switchStore().$tip("登录成功");
          routesStore().addRoutes(res.role);
          this.userStatus = true;
          // 获取用户信息
          this.userInfo = res;
          // 存储 token 到本地
          window.localStorage.setItem("wzryToken", res.wzryToken);
          router.push("/home");
          this.watchStatus();
        })
        .catch(() => {})
        .finally(() => {
          switchStore().$loading.close();
        });
    },

    /** @description: 获取用户信息 */
    getUserInfo() {
      const token = localStorage.getItem("wzryToken");
      return new Promise((resolve) => {
        if (token) {
          userInfo(token).then((res) => {
            if (res) {
              // 获取成功后存储用户信息
              this.userStatus = true;
              this.userInfo = res;
              routesStore().addRoutes(res.role);
              this.watchStatus();
            } else {
              switchStore().$tip("身份校验失败，请重新登录", "error");
              this.clearToken();
            }
            resolve(null);
          });
        } else {
          resolve(null);
        }
      });
    },

    /** @description: 退出登录 */
    logout() {
      this.clearToken();
      switchStore().$tip("退出成功");
    },

    /** @description: 清除token */
    clearToken() {
      clearInterval(this.timer);
      this.userStatus = false;
      this.userInfo = {
        id: 0,
        password: "",
        name: "",
        headImg: "",
        wzryToken: "",
        role: 1,
      };
      routesStore().removeRoutes();
      window.localStorage.removeItem("wzryToken");
      router.replace("/login");
    },

    /** @description: 实时检测帐号状态 */
    watchStatus() {
      this.timer = setInterval(() => {
        if (!localStorage.getItem("wzryToken")) {
          this.offline();
        }
      }, 1000);
    },

    /** @description: 强制下线 */
    offline() {
      switchStore().$tip("帐号在别处登录", "error");
      this.clearToken();
    },
  },
});

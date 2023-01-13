import { _login } from "@/api/main/user";
import { defineStore } from "pinia";
import { HOME_URL } from "@/config/config";
import { ref } from "vue";
import router from "@/router";
import routesStore from "@/store/routes";
import switchStore from "./globalSwitch";

export default defineStore("auth", () => {
  const userStatus = ref(false); // 用户状态
  const timer = ref<Interval | number>(0); //实时检测帐号状态
  // 用户相关信息
  const userInfo = ref<User>({
    id: "",
    password: "",
    nickname: "",
    headImg: "",
    wzryToken: "",
    role: 1,
  });

  /** @description: 设置用户状态 */
  const setUserStatus = (status: boolean) => {
    userStatus.value = status;
  };

  /** @description: 设置用户信息 */
  const setUserInfo = (data: User) => {
    userInfo.value = data;
  };

  /** @description: 登录 */
  const login = async (form: User) => {
    switchStore().$loading.show("登录中");
    switchStore().$clickAudio("登录");
    _login(form)
      .then((res) => {
        /* 登录成功 */
        switchStore().$tip("登录成功");
        routesStore().addRoutes(res.role!);
        userStatus.value = true;
        // 获取用户信息
        userInfo.value = res;
        // 存储 token 到本地
        window.localStorage.setItem("user", JSON.stringify(res));
        router.push(HOME_URL);
        watchStatus();
      })
      .catch((err) => {
        switchStore().$tip(err, "error");
      })
      .finally(() => {
        switchStore().$loading.close();
      });
  };

  /** @description: 自动登录 */
  const autoLogin = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    login(user).then(() => {
      switchStore().$tip("自动登录成功");
    });
  };

  /** @description: 退出登录 */
  const logout = () => {
    clearToken();
    switchStore().$tip("退出成功");
  };

  /** @description: 清除token */
  const clearToken = () => {
    clearInterval(timer.value);
    userStatus.value = false;
    userInfo.value = {
      id: "",
      password: "",
      nickname: "",
      headImg: "",
      wzryToken: "",
      role: 1,
    };
    routesStore().removeRoutes();
    window.localStorage.removeItem("user");
    router.replace("/login");
  };

  /** @description: 实时检测帐号状态 */
  const watchStatus = () => {
    timer.value = setInterval(() => {
      if (!localStorage.getItem("user")) {
        offline();
      }
    }, 1000);
  };

  /** @description: 强制下线 */
  const offline = () => {
    switchStore().$tip("帐号在别处登录", "error");
    clearToken();
  };

  return {
    userStatus,
    timer,
    userInfo,
    setUserStatus,
    setUserInfo,
    login,
    autoLogin,
    logout,
    clearToken,
    offline,
    watchStatus,
  };
});

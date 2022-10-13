import { defineStore } from 'pinia';
import useRouter from '@/router/index.js';
import switchStore from './globalSwitch.js';
import { login, logout, userInfo } from '@/api/main/user/index.js';

export default defineStore('auth', {
  state: () => ({
    wzryToken: localStorage.getItem('wzryToken'), //token
    userStatus: false, // 用户状态
    userInfo: {}, // 用户相关信息
    smooth: false,
  }),
  actions: {
    //#####··········登录··········#####//
    login(account) {
      // 请求登录接口
      return login(account).then((res) => {
        if (res.code === 200) {
          // 存储 token 到本地
          this.userStatus = true;
          this.wzryToken = res.data.wzryToken;
          window.localStorage.setItem('wzryToken', res.data.wzryToken);
          // 获取用户信息
          this.userInfo = res.data;
        }
      });
    },
    //#####··········获取用户信息··········#####//
    getUserInfo() {
      return new Promise((resolve) => {
        userInfo({
          wzryToken: this.wzryToken,
        })
          .then((res) => {
            if (!this.wzryToken) throw 'no token';
            if (res.data.length === 0) {
              switchStore().$tip('token校验失败，请重新登录', 'error');
              throw 'token Validation fails';
            } else {
              // 获取成功后存储用户信息
              this.userStatus = true;
              this.userInfo = res.data[0];
              resolve();
            }
          })
          .catch((err) => {
            console.error(err);
            this.clearToken();
          });
      });
    },

    //#####··········退出登录··········#####//
    logout() {
      return logout(this.userInfo.id);
    },

    //#####··········下线··········#####//
    clearToken() {
      this.wzryToken = '';
      this.userStatus = false;
      this.userInfo = {};
      window.localStorage.removeItem('wzryToken');
      useRouter.push('/login');
    },
  },
});

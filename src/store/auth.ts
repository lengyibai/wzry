import { defineStore } from 'pinia';
import { Form } from '@/api/main/user/interface'
import { AuthState } from './interface'
import useRouter from '@/router/index.js';
import switchStore from './globalSwitch.js';
import { login, logout, userInfo } from '@/api/main/user/index.js';

export default defineStore('auth', {
  state: (): AuthState => ({
    wzryToken: localStorage.getItem('wzryToken') as string, //token
    userStatus: false, // 用户状态

    // 用户相关信息
    userInfo: {
      id: 0,
      password: '',
      name: '',
      headImg: '',
    },
    smooth: false,
  }),
  actions: {
    //#####··········登录··········#####//
    login(form: Form) {
      // 请求登录接口
      return login(form).then((res: any) => {
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
          wzryToken: this.wzryToken as string,
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
              resolve(res);
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
      this.userInfo = {
        id: 0,
        password: '',
        name: '',
        headImg: '',
      };
      window.localStorage.removeItem('wzryToken');
      useRouter.push('/login');
    },
  },
});

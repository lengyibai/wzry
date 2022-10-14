import switchStore from '@/store/globalSwitch.js';
import { Form } from './interface'

import { getUserInfo, updateUser } from './transfer.js';

function tip(code: number, msg: string) {
  if (code === 200) {
    switchStore().$tip(msg);
  } else {
    switchStore().$tip(msg, 'error');
  }
}
//#####··········基本··········#####//
//####········登录········####//

export const login = (form: Form) => {
  /* 获取用户表 */
  return getUserInfo({ id: form.id }).then((res) => {
    if (res === undefined) {
      return { code: 404, msg: '请求错误' };
    } else if (!res?.data.length) {
      // 判断是否存在用户
      tip(401, '帐号不存在');
      return { code: 401, msg: '帐号不存在' };
    } else if (form.password === res.data[0].password) {
      // 数据库写入token
      updateUser(form.id, {
        wzryToken: new Date().getTime().toString().slice(0, 7),
      }).then((res) => {
        // 返回请求状态及数据
        return { data: res.data, code: 200, msg: '登录成功' };
      });
      tip(200, '登录成功');
    } else {
      tip(401, '密码错误');
      return { code: 401, msg: '密码错误' };
    }
  })
};
//####········自动登录········####//
export const userInfo = (form: { wzryToken: string }) => getUserInfo(form);

//####········登出········####//
export const logout = (id: number) => {
  return new Promise((resolve) => {
    // 清除数据库token
    updateUser(id, { wzryToken: '' });
    tip(200, '退出成功');
    resolve({ code: 200, msg: '退出成功' });
  });
};

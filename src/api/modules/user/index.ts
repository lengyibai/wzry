import dayjs from "dayjs";

import { get, post, patch, del } from "@/api/helper/transfer";
import { BASE_CONFIG, LOCAL_KEY } from "@/config";

/** @description 获取本地用户列表 */
export const userList = () => {
  return Promise.resolve(get<User[]>({ name: LOCAL_KEY.USER_LIST }));
};

/**
 * @description: 登录
 * @param form 表单对象
 */
export const login = (form: User) => {
  //通过帐号查询用户
  const data = get<User>({
    name: LOCAL_KEY.USER_LIST,
    key: "id",
    value: form.id,
  });

  //判断用户是否存在
  if (data) {
    //判断密码是否正确
    if (form.password === data.password) {
      //生成token
      let token = dayjs().unix();
      const data_token = localStorage.getItem(LOCAL_KEY.TOKEN);

      //设置时间token，用户完整下载数据
      if (!data_token) {
        localStorage.setItem(LOCAL_KEY.TOKEN, token.toString());
      }

      //如果本地存在token则进行过期判断，否则直接更新
      if (form.wzryToken) {
        //超过指定时间过期
        if (token - form.wzryToken > BASE_CONFIG.OVERDUE_ROLE_TIME) {
          return Promise.reject({
            type: "WZRY_TOKEN",
            msg: "身份已过期，请重新登录",
          });
        }

        //否则使用原token
        token = form.wzryToken;
      }

      //更新token并返回新的用户信息
      return Promise.resolve({ ...data, wzryToken: token });
    } else {
      return Promise.reject("密码错误");
    }
  } else {
    return Promise.reject("用户不存在");
  }
};

/**
 * @description: 获取用户信息
 * @param token token
 */
export const userInfo = (token: string) => {
  //通过token来查询用户
  return get<User>({
    name: LOCAL_KEY.USER_LIST,
    key: "wzryToken",
    value: token,
  });
};

/**
 * @description: 注册
 * @param form 表单对象
 */
export const register = (form: User) => {
  //通过帐号查询用户
  const data = get<User>({
    name: LOCAL_KEY.USER_LIST,
    key: "id",
    value: form.id,
  });

  //判断用户是否存在
  if (data) {
    return Promise.reject("用户已存在，请直接登录");
  } else {
    return Promise.resolve(post<User>(LOCAL_KEY.USER_LIST, form));
  }
};

/**
 * @description: 更新用户信息
 * @param id 用户id
 * @param info 用户信息
 */
export const updateUser = (id: string, info: Partial<User>) => {
  patch({ name: LOCAL_KEY.USER_LIST, key: "id", value: id, v: info }, true);
  //返回新信息
  return Promise.resolve(info);
};

/**
 * @description: 注销用户
 * @param id 用户id
 */
export const deleteUser = (id: string) => {
  //查询用户并删除
  del({ name: LOCAL_KEY.USER_LIST, id });
  return Promise.resolve("注销成功");
};

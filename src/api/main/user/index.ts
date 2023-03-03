import { get, post, patch, del } from "@/api/helper/transfer";
import { OVERDUE_ROLE_TIME } from "@/config";

/** @description 获取本地用户列表 */
export const userList = () => {
  return Promise.resolve(get<User[]>({ name: "data_user" }));
};

/**
 * @description: 登录
 * @param form 表单对象
 */
export const _login = async (form: User) => {
  //通过帐号查询用户
  const data = get<User>({
    name: "data_user",
    key: "id",
    value: form.id,
  });

  //判断用户是否存在
  if (data) {
    //判断密码是否正确
    if (form.password === data.password) {
      let token = Number(new Date().getTime().toString().slice(0, 10)); //生成token
      const data_token = localStorage.getItem("data_token");

      //设置时间token，用户完整下载数据
      if (!data_token) {
        localStorage.setItem("data_token", token.toString());
      }

      //如果本地存在token则进行过期判断，否则直接更新
      if (form.wzryToken) {
        //超过指定时间过期
        if (token - form.wzryToken > OVERDUE_ROLE_TIME) {
          return Promise.reject({
            type: "WZRY_TOKEN",
            msg: "身份已过期，请重新登录",
          });
        }

        //否则使用原token
        token = form.wzryToken;
      }

      return Promise.resolve({ ...data, wzryToken: token }); //更新token并返回新的用户信息
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
  return Promise.resolve(get<User>({ name: "data_user", key: "wzryToken", value: token }));
};

/**
 * @description: 注册
 * @param form 表单对象
 */
export const register = async (form: User) => {
  //通过帐号查询用户
  const data = get<User>({
    name: "data_user",
    key: "id",
    value: form.id,
  });

  //判断用户是否存在
  if (data) {
    return Promise.reject("用户已存在，请直接登录");
  } else {
    return Promise.resolve(post<User>("data_user", form));
  }
};

/**
 * @description: 更新用户信息
 * @param id 用户id
 * @param info 用户信息
 */
export const updateUser = (id: string, info: Partial<User>) => {
  patch({ name: "data_user", key: "id", value: id, v: info }, true);
  return Promise.resolve(info); //返回新信息
};

/**
 * @description: 注销用户
 * @param id 用户id
 */
export const deleteUser = (id: string) => {
  del({ name: "data_user", id }); //查询用户并删除
  return Promise.resolve("注销成功");
};

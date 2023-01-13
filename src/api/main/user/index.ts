import { get, post, patch } from "@/api/helper/transfer";

/** @description: 更新token */
const updateToken = (id: string, token: string) => {
  patch({ name: "data_user", key: "id", value: id, k: "wzryToken", v: token }); //将token写入本地
  return Promise.resolve(token); //返回新token
};

/** @description: 登录 */
export const _login = async (form: User) => {
  //通过帐号查询用户
  const data = get<User>({
    name: "data_user",
    key: "id",
    value: form.id,
  });

  /* 判断是否存在 */
  if (data) {
    /* 判断密码是否正确 */
    if (form.password === data.password) {
      const token = await updateToken(
        form.id || "",
        new Date().getTime().toString().slice(0, 8)
      );
      return Promise.resolve({ ...data, wzryToken: token }); //更新token并返回新的用户信息
    } else {
      return Promise.reject("密码错误");
    }
  } else {
    return Promise.reject("用户不存在");
  }
};

/** @description: 获取用户信息 */
export const userInfo = (token: string) => {
  //通过token来查询用户
  return Promise.resolve(
    get<User>({ name: "data_user", key: "wzryToken", value: token })
  );
};

/** @description: 注册 */
export const register = async (form: User) => {
  //通过帐号查询用户
  const data = get<User>({
    name: "data_user",
    key: "id",
    value: form.id,
  });

  /* 判断是否存在 */
  if (data) {
    return Promise.reject();
  } else {
    return Promise.resolve(post<User>("data_user", form));
  }
};

/** @description: 更新用户信息 */
export const updateUser = (id: string, info: User) => {
  patch({ name: "data_user", key: "id", value: id, v: info }, true); //将token写入本地
  return Promise.resolve(info); //返回新token
};

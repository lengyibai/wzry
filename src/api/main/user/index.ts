import { checkError } from "@/api/helper/checkStatus";
import { FormData } from "@/api/interface/form";
import { ResultData } from "@/api/interface/result";
import { get, patch } from "@/api/helper/transfer";

/** @description: 更新token */
const updateUser = (id: number, token: string) => {
  patch({ name: "data_user", key: "id", value: id, k: "wzryToken", v: token }); //将token写入本地
  return Promise.resolve(token); //返回新token
};

/** @description: 登录 */
export const login = async (form: FormData.User) => {
  //通过帐号查询用户
  const data = get<ResultData.User>({ name: "data_user", key: "id", value: form.id });
  /* 判断是否存在 */
  if (data) {
    /* 判断密码是否正确 */
    if (form.password === data.password) {
      const token = await updateUser(form.id, new Date().getTime().toString().slice(0, 8));
      return Promise.resolve({ ...data, wzryToken: token }); //更新token并返回新的用户信息
    } else {
      checkError("密码错误");
      return Promise.reject("密码错误");
    }
  } else {
    checkError("用户不存在");
    return Promise.reject("用户不存在");
  }
};

/** @description: 获取用户信息 */
export const userInfo = (token: string) => {
  //通过token来查询用户
  return Promise.resolve(get<ResultData.User>({ name: "data_user", key: "wzryToken", value: token }));
};

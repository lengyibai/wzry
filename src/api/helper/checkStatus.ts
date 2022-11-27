import switchStore from "@/store/globalSwitch";

/** @description: 错误调用 */
export const checkError = (msg: string) => {
  const $switchStore = switchStore();
  $switchStore.$tip(msg, "error");
};

/** @description: 成功调用 */
export const checkSuccess = (msg: string) => {
  const $switchStore = switchStore();
  $switchStore.$tip(msg);
};

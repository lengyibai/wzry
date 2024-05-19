/** @description 读取用户配置完毕 */
let readyDataResolve: any;

const readPromise = new Promise((resolve) => {
  readyDataResolve = resolve;
});

const useUserConfigFinish = {
  readPromise,
  readyDataResolve,
};

/** @description 重置Promise，在退出登录时调用 */
const resetPromise = () => {
  useUserConfigFinish.readPromise = new Promise((resolve) => {
    useUserConfigFinish.readyDataResolve = resolve;
  });
};

export { useUserConfigFinish, resetPromise };

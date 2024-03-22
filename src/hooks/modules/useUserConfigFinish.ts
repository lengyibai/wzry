/** @description 读取用户配置完毕 */
let readyDataResolve: any;

const readPromise = new Promise((resolve) => {
  readyDataResolve = resolve;
});

const useUserConfigFinish = {
  readPromise,
  readyDataResolve,
};

export { useUserConfigFinish };

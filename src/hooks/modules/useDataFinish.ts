/** @description 由于数据更新会先清除本地需要更新的数据，再通过useGetData，判断本地缺少什么数据并自动补充，此时需要通过此hook来等待数据加载完毕后跳转路由 */
let readyDataResolve: any;

const readPromise = new Promise((resolve) => {
  readyDataResolve = resolve;
});

const useDataFinish = {
  readPromise,
  readyDataResolve,
};

export { useDataFinish };

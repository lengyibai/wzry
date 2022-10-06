import { getHistorys } from './transfer.js';

//#####········获取历史故事········#####//
export const getHistory = (data) => new Promise((resolve) => {
  getHistorys(data).then((res) => (data ? resolve(res.data[0].data) : resolve(res.data)));
});

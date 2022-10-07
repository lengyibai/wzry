import { getGameStorys } from './transfer.js';

//#####········获取英雄故事········#####//
export const getGameStory = (data) => new Promise((resolve) => {
  getGameStorys(data).then((res) => (data ? resolve(res.data[0]?.data) : resolve(res.data)));
});

import { getHeroLists } from './transfer.js';

//#####········获取英雄基础········#####//
export const heroList = (data) => new Promise((resolve) => {
  getHeroLists(data).then((res) => (data ? resolve(res.data[0]?.data) : resolve(res.data)));
});

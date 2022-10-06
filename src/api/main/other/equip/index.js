//#####········获取装备········#####//
import { getEquips } from './transfer.js';

export const getEquip = (data) => new Promise((resolve) => {
  getEquips(data).then(async (res) => {
    if (data) {
      resolve(data);
    } else {
      resolve(res.data);
    }
  });
});

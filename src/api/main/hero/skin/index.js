//#####········获取皮肤········#####//
import { getSkins } from './transfer.js';

export const getSkin = (data) => new Promise((resolve) => {
  getSkins(data).then(async (res) => {
    if (data) {
      resolve(res.data[0].data);
    } else {
      resolve(res.data);
    }
  });
});

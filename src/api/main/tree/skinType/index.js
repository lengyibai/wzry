import { getSkinTypes } from './transfer.js';

//#####········获取皮肤类型········#####//
export const getSkinType = (data) => new Promise((resolve) => {
  getSkinTypes(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

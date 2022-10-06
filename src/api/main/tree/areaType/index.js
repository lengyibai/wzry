import { getAreaTypes } from './transfer.js';

//#####········获取区域类型········#####//
export const getAreaType = (data) => new Promise((resolve) => {
  getAreaTypes(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

import { getCampTypes } from './transfer.js';

//#####········获取阵营类型········#####//
export const getCampType = (data) => new Promise((resolve) => {
  getCampTypes(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

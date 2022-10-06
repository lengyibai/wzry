import { getRelationTypes } from './transfer.js';

//#####········获取关系类型········#####//
export const getRelationType = (data) => new Promise((resolve) => {
  getRelationTypes(data).then((res) => (data ? resolve(res.data[0]) : resolve(res.data)));
});

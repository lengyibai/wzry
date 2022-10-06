import { getProfessionTypes } from './transfer.js';

//#####········获取职业类型········#####//
export const getProfessionType = (data) => new Promise((resolve) => {
  getProfessionTypes(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

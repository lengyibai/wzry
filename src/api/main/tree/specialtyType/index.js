import { getSpecialtyTypes } from './transfer.js';

//#####········获取特长类型········#####//
export const getSpecialtyType = (data) => new Promise((resolve) => {
  getSpecialtyTypes(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

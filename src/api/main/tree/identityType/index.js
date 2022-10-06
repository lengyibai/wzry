import { getIdentityTypes } from './transfer.js';

//#####········获取身份类型········#####//
export const getIdentityType = (data) => new Promise((resolve) => {
  getIdentityTypes(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

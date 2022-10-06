import { getLocationTypes } from './transfer.js';

//#####········获取定位类型········#####//
export const getLocationType = (data) => new Promise((resolve) => {
  getLocationTypes(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

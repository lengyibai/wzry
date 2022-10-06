import { getPeriodTypes } from './transfer.js';

//#####········获取时期类型········#####//
export const getPeriodType = (data) => new Promise((resolve) => {
  getPeriodTypes(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

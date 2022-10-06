import { getEpigraphTypes } from './transfer.js';

//#####········获取铭文类型········#####//
export const getEpigraphType = (data) => new Promise((resolve) => {
  getEpigraphTypes(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

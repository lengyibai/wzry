import { getEpigraphEffects } from './transfer.js';

//#####········获取铭文效果········#####//
export const getEpigraphEffect = (data) => new Promise((resolve) => {
  getEpigraphEffects(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

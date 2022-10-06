//#####········获取铭文········#####//
import { getEpigraphs } from './transfer.js';

export const getEpigraph = (data) => new Promise((resolve) => {
  getEpigraphs(data).then(async (res) => {
    if (data) {
      resolve(res.data[0]);
    } else {
      resolve(res.data);
    }
  });
});

import { getEnergyTypes } from './transfer.js';

//#####········获取能量类型········#####//
export const getEnergyType = (data) => new Promise((resolve) => {
  getEnergyTypes(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

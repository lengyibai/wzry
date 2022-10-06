import { getEquipTypes } from './transfer.js';

//#####········获取装备类型········#####//
export const getEquipType = (data) => new Promise((resolve) => {
  getEquipTypes(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

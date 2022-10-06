import { getEquipEffects } from './transfer.js';

//#####········获取装备效果········#####//
export const getEquipEffect = (data) => new Promise((resolve) => {
  getEquipEffects(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

import { get } from "@/api/helper/transfer";

/** @description: 获取装备列表 */
export const getEquip = () => {
  return Promise.resolve(get<Equip.Data[]>({ name: "data_equip" }));
};
/** @description: 获取装备类型列表 */
export const getEquipType = () => {
  return Promise.resolve(get<Hero.General[]>({ name: "data_equiptype" }));
};
/** @description: 获取装备效果列表 */
export const getEquipEffect = () => {
  return Promise.resolve(get<Hero.General[]>({ name: "data_equipeffect" }));
};

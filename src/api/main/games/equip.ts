import { get } from "@/api/helper/transfer";

/** @description: 获取装备列表 */
export const getEquip = () => {
  return Promise.resolve(get<Equip.Data[]>({ name: "data_equip" }));
};

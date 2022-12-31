import { get } from "@/api/helper/transfer";

/** @description: 获取装备合成列表 */
export const getEquipSynthetic = (id: number) => {
  return Promise.resolve(
    get<Equip.Synthetic>({ name: "data_equipSynthetic", key: "id", value: id })
  );
};

import { get } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/**
 * @description 获取装备合成列表
 * @param equip_id 装备id
 */
export const getEquipSynthetic = (equip_id: number) =>
  Promise.resolve(get<Equip.Synthetic>({ name: CONFIG.LOCAL_KEY.EQUIP_SYNTHETIC, key: "id", value: equip_id }));

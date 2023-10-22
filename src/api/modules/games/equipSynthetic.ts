import { get } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取装备合成列表 */
export const getEquipSynthetic = (equip_id: number) => {
  const params = { name: CONFIG.LOCAL_KEY.EQUIP_SYNTHETIC, key: "id", value: equip_id };
  const equip_synthetic_list = get<Equip.Synthetic>(params);
  return Promise.resolve(equip_synthetic_list);
};

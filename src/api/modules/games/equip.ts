import { get } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取装备列表 */
export const getEquip = () => {
  const equip_list = get<Equip.Data[]>({ name: CONFIG.LOCAL_KEY.EQUIP });
  return Promise.resolve(equip_list);
};

/** @description 获取装备类型列表 */
export const getEquipType = () => {
  const equip_type_list = get<General[]>({ name: CONFIG.LOCAL_KEY.EQUIP_TYPE });
  Promise.resolve(equip_type_list);
};

/** @description 获取装备效果列表 */
export const getEquipEffect = () => {
  const equip_effect_list = get<General[]>({
    name: CONFIG.LOCAL_KEY.EQUIP_EFFECT,
  });
  return Promise.resolve(equip_effect_list);
};

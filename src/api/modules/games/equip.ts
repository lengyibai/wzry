import { get } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取装备列表 */
export const getEquip = () => Promise.resolve(get<Equip.Data[]>({ name: CONFIG.LOCAL_KEY.EQUIP }));

/** @description 获取装备类型列表 */
export const getEquipType = () => Promise.resolve(get<General[]>({ name: CONFIG.LOCAL_KEY.EQUIP_TYPE }));

/** @description 获取装备效果列表 */
export const getEquipEffect = () => Promise.resolve(get<General[]>({ name: CONFIG.LOCAL_KEY.EQUIP_EFFECT }));

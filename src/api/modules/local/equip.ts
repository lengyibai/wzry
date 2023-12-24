import { get } from "@/api/helper/transfer";
import { LOCAL_KEY } from "@/config/modules/local-key";

/** @description 获取装备列表 */
export const getEquipList = () => {
  return get<number[]>({ name: LOCAL_KEY.EQUIP });
};

/** @description 获取装备简述列表 */
export const getEquipDescList = () => {
  return get<Remote.Equip.Desc[]>({ name: LOCAL_KEY.EQUIP_DESC });
};

/** @description 获取装备效果列表 */
export const getEquipEffectList = () => {
  return get<Remote.Equip.Effect[]>({ name: LOCAL_KEY.EQUIP_EFFECT });
};

/** @description 获取装备图片列表 */
export const getEquipImageList = () => {
  return get<Remote.Equip.Image[]>({ name: LOCAL_KEY.EQUIP_IMAGE });
};

/** @description 获取装备级别列表 */
export const getEquipLevelList = () => {
  return get<Remote.Equip.Level[]>({ name: LOCAL_KEY.EQUIP_LEVEL });
};

/** @description 获取装备动机列表 */
export const getEquipMotivationList = () => {
  return get<Remote.Equip.Motivation[]>({ name: LOCAL_KEY.EQUIP_MOTIVATION });
};

/** @description 获取装备名称列表 */
export const getEquipNameList = () => {
  return get<Remote.Equip.Name[]>({ name: LOCAL_KEY.EQUIP_NAME });
};

/** @description 获取装备备注列表 */
export const getEquipNOteList = () => {
  return get<Remote.Equip.Note[]>({ name: LOCAL_KEY.EQUIP_NOTE });
};

/** @description 获取装备价格列表 */
export const getEquipPriceList = () => {
  return get<Remote.Equip.Price[]>({ name: LOCAL_KEY.EQUIP_PRICE });
};

/** @description 获取装备合成列表 */
export const getEquipSyntheticList = () => {
  return get<Remote.Equip.Synthetic[]>({ name: LOCAL_KEY.EQUIP_SYNTHETIC });
};

/** @description 获取装备类型列表 */
export const getEquipTypeList = () => {
  return get<Remote.Equip.Type[]>({ name: LOCAL_KEY.EQUIP_TYPE });
};

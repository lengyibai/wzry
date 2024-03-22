import { get } from "@/api/helper/transfer";
import { LOCAL_KEY } from "@/config/modules/local-key";

/** @description 获取装备列表 */
export const getEquipList = async () => {
  return await get<number[]>(LOCAL_KEY.EQUIP);
};

/** @description 获取装备简述列表 */
export const getEquipDescList = async () => {
  return await get<Remote.Equip.Desc[]>(LOCAL_KEY.EQUIP_DESC);
};

/** @description 获取装备效果列表 */
export const getEquipEffectList = async () => {
  return await get<Remote.Equip.Effect[]>(LOCAL_KEY.EQUIP_EFFECT);
};

/** @description 获取装备图片列表 */
export const getEquipImageList = async () => {
  return await get<Remote.Equip.Image[]>(LOCAL_KEY.EQUIP_IMAGE);
};

/** @description 获取装备级别列表 */
export const getEquipLevelList = async () => {
  return await get<Remote.Equip.Level[]>(LOCAL_KEY.EQUIP_LEVEL);
};

/** @description 获取装备动机列表 */
export const getEquipMotivationList = async () => {
  return await get<Remote.Equip.Motivation[]>(LOCAL_KEY.EQUIP_MOTIVATION);
};

/** @description 获取装备名称列表 */
export const getEquipNameList = async () => {
  return await get<Remote.Equip.Name[]>(LOCAL_KEY.EQUIP_NAME);
};

/** @description 获取装备备注列表 */
export const getEquipNOteList = async () => {
  return await get<Remote.Equip.Note[]>(LOCAL_KEY.EQUIP_NOTE);
};

/** @description 获取装备价格列表 */
export const getEquipPriceList = async () => {
  return await get<Remote.Equip.Price[]>(LOCAL_KEY.EQUIP_PRICE);
};

/** @description 获取装备合成列表 */
export const getEquipSyntheticList = async () => {
  return await get<Remote.Equip.Synthetic[]>(LOCAL_KEY.EQUIP_SYNTHETIC);
};

/** @description 获取装备类型列表 */
export const getEquipTypeList = async () => {
  return await get<Remote.Equip.Type[]>(LOCAL_KEY.EQUIP_TYPE);
};

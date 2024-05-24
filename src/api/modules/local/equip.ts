import { get } from "@/api/helper/transfer";
import { LOCAL_KEY } from "@/config/modules/local-key";

/** @description 获取装备列表 */
export const getEquipList = async () => {
  return await get<number[]>(LOCAL_KEY.equip);
};

/** @description 获取装备简述列表 */
export const getEquipDescList = async () => {
  return await get<Remote.Equip.Desc[]>(LOCAL_KEY.equipDesc);
};

/** @description 获取装备效果列表 */
export const getEquipEffectList = async () => {
  return await get<Remote.Equip.Effect[]>(LOCAL_KEY.equipEffect);
};

/** @description 获取装备图片列表 */
export const getEquipImageList = async () => {
  return await get<Remote.Equip.Image[]>(LOCAL_KEY.equipImage);
};

/** @description 获取装备级别列表 */
export const getEquipLevelList = async () => {
  return await get<Remote.Equip.Level[]>(LOCAL_KEY.equipLevel);
};

/** @description 获取装备动机列表 */
export const getEquipMotivationList = async () => {
  return await get<Remote.Equip.Motivation[]>(LOCAL_KEY.equipMotivation);
};

/** @description 获取装备名称列表 */
export const getEquipNameList = async () => {
  return await get<Remote.Equip.Name[]>(LOCAL_KEY.equipName);
};

/** @description 获取装备备注列表 */
export const getEquipNOteList = async () => {
  return await get<Remote.Equip.Note[]>(LOCAL_KEY.equipNote);
};

/** @description 获取装备价格列表 */
export const getEquipPriceList = async () => {
  return await get<Remote.Equip.Price[]>(LOCAL_KEY.equipPrice);
};

/** @description 获取装备合成列表 */
export const getEquipSyntheticList = async () => {
  return await get<Remote.Equip.Synthetic[]>(LOCAL_KEY.equipSynthetic);
};

/** @description 获取装备类型列表 */
export const getEquipTypeList = async () => {
  return await get<Remote.Equip.Type[]>(LOCAL_KEY.equipType);
};

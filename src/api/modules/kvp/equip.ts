import { LOCAL_EQUIP } from "@/api";
import { BASE_CONFIG } from "@/config";

/** @description 获取装备级别键值表 */
export const getEquipDescKvp = async () => {
  const data = await LOCAL_EQUIP.getEquipDescList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取装备效果键值表 */
export const getEquipEffectKvp = async () => {
  const data = await LOCAL_EQUIP.getEquipEffectList();
  const kvp: Record<number, Remote.Equip.Effect["value"]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取装备图片键值表 */
export const getEquipImageKvp = async () => {
  const data = await LOCAL_EQUIP.getEquipImageList();
  const kvp: Record<number, Pick<Remote.Equip.Image, "icon" | "iconBlur">> = {};
  data.forEach((item) => {
    kvp[item.id] = {
      icon: BASE_CONFIG.IMGBED + item.icon,
      iconBlur: BASE_CONFIG.IMGBED + item.iconBlur,
    };
  });
  return kvp;
};

/** @description 获取装备级别键值表 */
export const getEquipLevelKvp = async () => {
  const data = await LOCAL_EQUIP.getEquipLevelList();
  const kvp: Record<number, Remote.Equip.Level> = {};
  data.forEach((item) => {
    kvp[item.id] = item;
  });
  return kvp;
};

/** @description 获取装备动机键值表 */
export const getEquipMotivationKvp = async () => {
  const data = await LOCAL_EQUIP.getEquipMotivationList();
  const kvp: Record<number, Remote.Equip.Motivation["value"]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取装备名称键值表 */
export const getEquipNameKvp = async () => {
  const data = await LOCAL_EQUIP.getEquipNameList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取装备备注键值表 */
export const getEquipNoteKvp = async () => {
  const data = await LOCAL_EQUIP.getEquipNOteList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取装备价格键值表 */
export const getEquipPriceKvp = async () => {
  const data = await LOCAL_EQUIP.getEquipPriceList();
  const kvp: Record<number, number> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取装备合成键值表 */
export const getEquipSyntheticKvp = async () => {
  const data = await LOCAL_EQUIP.getEquipSyntheticList();
  const kvp: Record<number, Remote.Equip.Synthetic> = {};
  data.forEach((item) => {
    kvp[item.id] = item;
  });
  return kvp;
};

/** @description 获取装备类型键值表 */
export const getEquipTypeKvp = async () => {
  const data = await LOCAL_EQUIP.getEquipTypeList();
  const kvp: Record<number, number> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

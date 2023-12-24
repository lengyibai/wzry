import { LOCAL_TYPE } from "@/api";

/** @description 获取类型阵营键值表 */
export const getCampKvp = () => {
  const data = LOCAL_TYPE.getTypeCampList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型铭文键值表 */
export const getEpigraphKvp = () => {
  const data = LOCAL_TYPE.getTypeEpigraphList();
  const kvp: Record<number, Remote.DataType.Epigraph["value"]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取铭文效果键值表 */
export const getEpigraphEffectKvp = () => {
  const data = LOCAL_TYPE.getTypeEpigraphEffectList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型装备键值表 */
export const getEquipKvp = () => {
  const data = LOCAL_TYPE.getTypeEquipList();
  const kvp: Record<number, Equip.Category> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型装备效果键值表 */
export const getEquipEffectKvp = () => {
  const data = LOCAL_TYPE.getTypeEquipEffectList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型定位键值表 */
export const getLocationKvp = () => {
  const data = LOCAL_TYPE.getTypeLocationList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型时期键值表 */
export const getPeriodKvp = () => {
  const data = LOCAL_TYPE.getTypePeriodList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型职业键值表 */
export const getProfessionKvp = () => {
  const data = LOCAL_TYPE.getTypeProfessionList();
  const kvp: Record<number, Hero.Profession> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型种族键值表 */
export const getRaceKvp = () => {
  const data = LOCAL_TYPE.getTypeRaceList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型皮肤键值表 */
export const getSkinKvp = () => {
  const data = LOCAL_TYPE.getTypeSkinList();
  const kvp: Record<number, Remote.DataType.Skin> = {};
  data.forEach((item) => {
    kvp[item.id] = item;
  });
  return kvp;
};

/** @description 获取类型特长键值表 */
export const getSpecialtyKvp = () => {
  const data = LOCAL_TYPE.getTypeSpecialtyList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

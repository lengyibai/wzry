import { LOCAL_TYPE } from "@/api";

/** @description 获取类型阵营键值表 */
export const getCampKvp = async () => {
  const data = await LOCAL_TYPE.getTypeCampList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型铭文键值表 */
export const getEpigraphKvp = async () => {
  const data = await LOCAL_TYPE.getTypeEpigraphList();
  const kvp: Record<number, Remote.DataType.Epigraph["value"]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取铭文效果键值表 */
export const getEpigraphEffectKvp = async () => {
  const data = await LOCAL_TYPE.getTypeEpigraphEffectList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型装备键值表 */
export const getEquipKvp = async () => {
  const data = await LOCAL_TYPE.getTypeEquipList();
  const kvp: Record<number, Game.Equip.Category> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型装备效果键值表 */
export const getEquipEffectKvp = async () => {
  const data = await LOCAL_TYPE.getTypeEquipEffectList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型定位键值表 */
export const getLocationKvp = async () => {
  const data = await LOCAL_TYPE.getTypeLocationList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型时期键值表 */
export const getPeriodKvp = async () => {
  const data = await LOCAL_TYPE.getTypePeriodList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型职业键值表 */
export const getProfessionKvp = async () => {
  const data = await LOCAL_TYPE.getTypeProfessionList();
  const kvp: Record<number, Game.Hero.Profession> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型种族键值表 */
export const getRaceKvp = async () => {
  const data = await LOCAL_TYPE.getTypeRaceList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取类型皮肤键值表 */
export const getSkinKvp = async () => {
  const data = await LOCAL_TYPE.getTypeSkinList();
  const kvp: Record<number, Remote.DataType.Skin> = {};
  data.forEach((item) => {
    kvp[item.id] = item;
  });
  return kvp;
};

/** @description 获取类型特长键值表 */
export const getSpecialtyKvp = async () => {
  const data = await LOCAL_TYPE.getTypeSpecialtyList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

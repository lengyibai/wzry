import { get } from "@/api/helper/transfer";
import { LOCAL_KEY } from "@/config/modules/local-key";

/** @description 获取类型阵营列表 */
export const getTypeCampList = async () => {
  return await get<Remote.DataType.Camp[]>(LOCAL_KEY.typeCamp);
};

/** @description 获取类型铭文列表 */
export const getTypeEpigraphList = async () => {
  return await get<Remote.DataType.Epigraph[]>(LOCAL_KEY.typeEpigraph);
};

/** @description 获取类型铭文效果列表 */
export const getTypeEpigraphEffectList = async () => {
  return await get<Remote.DataType.EpigraphEffect[]>(LOCAL_KEY.typeEpigraphEffect);
};

/** @description 获取类型装备列表 */
export const getTypeEquipList = async () => {
  return await get<Remote.DataType.Equip[]>(LOCAL_KEY.typeEquip);
};

/** @description 获取类型装备效果列表 */
export const getTypeEquipEffectList = async () => {
  return await get<Remote.DataType.EquipEffect[]>(LOCAL_KEY.typeEquipEffect);
};

/** @description 获取类型定位列表 */
export const getTypeLocationList = async () => {
  return await get<Remote.DataType.Location[]>(LOCAL_KEY.typeLocation);
};

/** @description 获取类型时期列表 */
export const getTypePeriodList = async () => {
  return await get<Remote.DataType.Period[]>(LOCAL_KEY.typePeriod);
};

/** @description 获取类型职业列表 */
export const getTypeProfessionList = async () => {
  return await get<Remote.DataType.Profession[]>(LOCAL_KEY.typeProfession);
};

/** @description 获取类型种族列表 */
export const getTypeRaceList = async () => {
  return await get<Remote.DataType.Race[]>(LOCAL_KEY.typeRace);
};

/** @description 获取类型皮肤列表 */
export const getTypeSkinList = async () => {
  return await get<Remote.DataType.Skin[]>(LOCAL_KEY.typeSkin);
};

/** @description 获取类型特长列表 */
export const getTypeSpecialtyList = async () => {
  return await get<Remote.DataType.Specialty[]>(LOCAL_KEY.typeSpecialty);
};

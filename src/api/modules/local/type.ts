import { get } from "@/api/helper/transfer";
import { LOCAL_KEY } from "@/config/modules/local-key";

/** @description 获取类型阵营列表 */
export const getTypeCampList = async () => {
  return await get<Remote.DataType.Camp[]>(LOCAL_KEY.TYPE_CAMP);
};

/** @description 获取类型铭文列表 */
export const getTypeEpigraphList = async () => {
  return await get<Remote.DataType.Epigraph[]>(LOCAL_KEY.TYPE_EPIGRAPH);
};

/** @description 获取类型铭文效果列表 */
export const getTypeEpigraphEffectList = async () => {
  return await get<Remote.DataType.EpigraphEffect[]>(LOCAL_KEY.TYPE_EPIGRAPH_EFFECT);
};

/** @description 获取类型装备列表 */
export const getTypeEquipList = async () => {
  return await get<Remote.DataType.Equip[]>(LOCAL_KEY.TYPE_EQUIP);
};

/** @description 获取类型装备效果列表 */
export const getTypeEquipEffectList = async () => {
  return await get<Remote.DataType.EquipEffect[]>(LOCAL_KEY.TYPE_EQUIP_EFFECT);
};

/** @description 获取类型定位列表 */
export const getTypeLocationList = async () => {
  return await get<Remote.DataType.Location[]>(LOCAL_KEY.TYPE_LOCATION);
};

/** @description 获取类型时期列表 */
export const getTypePeriodList = async () => {
  return await get<Remote.DataType.Period[]>(LOCAL_KEY.TYPE_PERIOD);
};

/** @description 获取类型职业列表 */
export const getTypeProfessionList = async () => {
  return await get<Remote.DataType.Profession[]>(LOCAL_KEY.TYPE_PROFESSION);
};

/** @description 获取类型种族列表 */
export const getTypeRaceList = async () => {
  return await get<Remote.DataType.Race[]>(LOCAL_KEY.TYPE_RACE);
};

/** @description 获取类型皮肤列表 */
export const getTypeSkinList = async () => {
  return await get<Remote.DataType.Skin[]>(LOCAL_KEY.TYPE_SKIN);
};

/** @description 获取类型特长列表 */
export const getTypeSpecialtyList = async () => {
  return await get<Remote.DataType.Specialty[]>(LOCAL_KEY.TYPE_SPECIALTY);
};

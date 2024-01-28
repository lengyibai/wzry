import { get } from "@/api/helper/transfer";
import { LOCAL_KEY } from "@/config/modules/local-key";

/** @description 获取类型阵营列表 */
export const getTypeCampList = () => {
  return get<Remote.DataType.Camp[]>({ name: LOCAL_KEY.TYPE_CAMP });
};

/** @description 获取类型铭文列表 */
export const getTypeEpigraphList = () => {
  return get<Remote.DataType.Epigraph[]>({ name: LOCAL_KEY.TYPE_EPIGRAPH });
};

/** @description 获取类型铭文效果列表 */
export const getTypeEpigraphEffectList = () => {
  return get<Remote.DataType.EpigraphEffect[]>({ name: LOCAL_KEY.TYPE_EPIGRAPH_EFFECT });
};

/** @description 获取类型装备列表 */
export const getTypeEquipList = () => {
  return get<Remote.DataType.Equip[]>({ name: LOCAL_KEY.TYPE_EQUIP });
};

/** @description 获取类型装备效果列表 */
export const getTypeEquipEffectList = () => {
  return get<Remote.DataType.EquipEffect[]>({ name: LOCAL_KEY.TYPE_EQUIP_EFFECT });
};

/** @description 获取类型定位列表 */
export const getTypeLocationList = () => {
  return get<Remote.DataType.Location[]>({ name: LOCAL_KEY.TYPE_LOCATION });
};

/** @description 获取类型时期列表 */
export const getTypePeriodList = () => {
  return get<Remote.DataType.Period[]>({ name: LOCAL_KEY.TYPE_PERIOD });
};

/** @description 获取类型职业列表 */
export const getTypeProfessionList = () => {
  return get<Remote.DataType.Profession[]>({ name: LOCAL_KEY.TYPE_PROFESSION });
};

/** @description 获取类型种族列表 */
export const getTypeRaceList = () => {
  return get<Remote.DataType.Race[]>({ name: LOCAL_KEY.TYPE_RACE });
};

/** @description 获取类型皮肤列表 */
export const getTypeSkinList = () => {
  return get<Remote.DataType.Skin[]>({ name: LOCAL_KEY.TYPE_SKIN });
};

/** @description 获取类型特长列表 */
export const getTypeSpecialtyList = () => {
  return get<Remote.DataType.Specialty[]>({ name: LOCAL_KEY.TYPE_SPECIALTY });
};

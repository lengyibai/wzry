import http from "@/api/index";

/** @description: 获取用户列表 */
export const getUser = () => http.Get<any[]>("/user.json");

/** @description: 获取英雄基础列表 */
export const getHerobasic = () => http.Get<any[]>("/heroBasic.json");

/** @description: 获取英雄信息列表 */
export const getHerodata = () => http.Get<any[]>("/heroData.json");

/** @description: 获取技能类型列表 */
export const getSkilltype = () => http.Get<any[]>("/skillType.json");

/** @description: 获取技能效果列表 */
export const getSkilleffect = () => http.Get<any[]>("/skillEffect.json");

/** @description: 获取皮肤列表 */
export const getSkin = () => http.Get<any[]>("/skin.json");

/** @description: 获取皮肤类型列表 */
export const getSkintype = () => http.Get<any[]>("/skinType.json");

/** @description: 获取装备列表 */
export const getEquip = () => http.Get<any[]>("/equip.json");

/** @description: 获取装备类型列表 */
export const getEquiptype = () => http.Get<any[]>("/equipType.json");

/** @description: 获取装备效果列表 */
export const getEquipeffect = () => http.Get<any[]>("/equipEffect.json");

/** @description: 获取铭文列表 */
export const getEpigraph = () => http.Get<any[]>("/epigraph.json");

/** @description: 获取铭文类型列表 */
export const getEpigraphtype = () => http.Get<any[]>("/epigraphType.json");

/** @description: 获取铭文效果列表 */
export const getEpigrapheffect = () => http.Get<any[]>("/epigraphEffect.json");

/** @description: 获取职业列表 */
export const getProfessiontype = () => http.Get<any[]>("/professionType.json");

/** @description: 获取定位列表 */
export const getLocationtype = () => http.Get<any[]>("/locationType.json");

/** @description: 获取特长列表 */
export const getSpecialtytype = () => http.Get<any[]>("/specialtyType.json");

/** @description: 获取时期列表 */
export const getPeriodtype = () => http.Get<any[]>("/periodType.json");

/** @description: 获取阵营列表 */
export const getCamptype = () => http.Get<any[]>("/campType.json");

/** @description: 获取关系列表 */
export const getRelationtype = () => http.Get<any[]>("/relationType.json");

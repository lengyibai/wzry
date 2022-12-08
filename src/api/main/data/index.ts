import http from "@/api/index";

/** @description: 获取用户列表 */
export const User = () => http.Get<any[]>("/user.json");

/** @description: 获取英雄基础列表 */
export const HeroBasic = () => http.Get<any[]>("/heroBasic.json");

/** @description: 获取英雄图片列表 */
export const HeroImg = () => http.Get<any[]>("/heroImg.json");

/** @description: 获取英雄信息列表 */
export const Herodata = () => http.Get<any[]>("/heroData.json");

/** @description: 获取英雄语音列表 */
export const Voice = (hero_name: string) => http.Get<any[]>(`/voices/${hero_name}.json`);

/** @description: 获取技能列表 */
export const Skill = () => http.Get<any[]>("/skill.json");

/** @description: 获取技能类型列表 */
export const Skilltype = () => http.Get<any[]>("/skillType.json");

/** @description: 获取技能效果列表 */
export const Skilleffect = () => http.Get<any[]>("/skillEffect.json");

/** @description: 获取皮肤列表 */
export const Skin = () => http.Get<any[]>("/skin.json");

/** @description: 获取皮肤类型列表 */
export const Skintype = () => http.Get<any[]>("/skinType.json");

/** @description: 获取关系列表 */
export const Relationship = () => http.Get<any[]>("/relationship.json");

/** @description: 获取关系类型列表 */
export const Relationtype = () => http.Get<any[]>("/relationType.json");

/** @description: 获取装备列表 */
export const Equip = () => http.Get<any[]>("/equip.json");

/** @description: 获取装备类型列表 */
export const Equiptype = () => http.Get<any[]>("/equipType.json");

/** @description: 获取装备效果列表 */
export const Equipeffect = () => http.Get<any[]>("/equipEffect.json");

/** @description: 获取铭文列表 */
export const Epigraph = () => http.Get<any[]>("/epigraph.json");

/** @description: 获取铭文类型列表 */
export const Epigraphtype = () => http.Get<any[]>("/epigraphType.json");

/** @description: 获取铭文效果列表 */
export const Epigrapheffect = () => http.Get<any[]>("/epigraphEffect.json");

/** @description: 获取职业列表 */
export const Professiontype = () => http.Get<any[]>("/professionType.json");

/** @description: 获取定位列表 */
export const Locationtype = () => http.Get<any[]>("/locationType.json");

/** @description: 获取特长列表 */
export const Specialtytype = () => http.Get<any[]>("/specialtyType.json");

/** @description: 获取时期列表 */
export const Periodtype = () => http.Get<any[]>("/periodType.json");

/** @description: 获取阵营列表 */
export const Camptype = () => http.Get<any[]>("/campType.json");

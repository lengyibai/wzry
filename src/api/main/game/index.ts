import http from "@/api/index";

interface Params {
  id?: Number;
  name?: string;
}
/* GET请求 */
/** @description: 获取英雄基础列表 */
export const getHeroList = (data?: Params) => http.Get<any[]>("/allhero", data);
/** @description: 获取英雄 */
export const getHero = (data?: Params) => http.Get<any[]>("/hero", data);
/** @description: 获取皮肤 */
export const getSkin = (data: Params) => http.Get<any[]>(`/skin${data ? `?hero=${data.id}` : ""}`);

/** @description: 获取皮肤类型 */
export const getSkinType = (data?: Params) => http.Get<Hero.SkinType[]>("/skinType", data);
/** @description: 获取技能效果 */
export const getSkillEffect = (data?: Params) => http.Get<Hero.SkillEffect[]>("/skillEffect", data);
/** @description: 获取技能类型 */
export const getSkillType = (data?: Params) => http.Get<Hero.SkillType[]>("/skillType", data);
/** @description: 获取关系表 */
export const getRelation = (data: Params) => http.Get<any[]>("/relation", data);
/** @description: 获取职业类型 */
export const getProfessionType = (data?: Params) => http.Get<any[]>("/professionType", data);
/** @description: 获取阵营类型 */
export const getCampType = (data?: Params) => http.Get<any[]>("/campType", data);
/** @description: 获取能量类型 */
export const getEnergyType = (data?: Params) => http.Get<any[]>("/energyType", data);
/** @description: 获取定位类型 */
export const getLocationType = (data?: Params) => http.Get<any[]>("/locationType", data);
/** @description: 获取时期类型 */
export const getPeriodType = (data?: Params) => http.Get<any[]>("/periodType", data);
/** @description: 获取特长类型 */
export const getSpecialtyType = (data?: Params) => http.Get<any[]>("/specialtyType", data);
/** @description: 获取装备 */
export const getEquip = (data?: Params) => http.Get<any[]>("/equip", data);
/** @description: 获取装备类型 */
export const getEquipType = (data?: Params) => http.Get<any[]>("/equipType", data);
/** @description: 获取装备效果 */
export const getEquipEffect = (data?: Params) => http.Get<any[]>("/equipEffect", data);
/** @description: 获取铭文 */
export const getEpigraph = (data?: Params) => http.Get<any[]>("/epigraph", data);
/** @description: 获取铭文类型 */
export const getEpigraphType = (data: Params) => http.Get<any[]>("/epigraphType", data);
/** @description: 获取铭文效果 */
export const getEpigraphEffect = (data: Params) => http.Get<any[]>("/epigraphEffect", data);

/* POST请求 */
/** @description: 添加英雄基础列表 */
export const addHeroList = (data: Params) => http.Post("/heroList", data);
/** @description: 添加英雄 */
export const addHero = (data?: Hero.Data) => http.Post("/hero", data);
/** @description: 添加皮肤 */
export const addSkin = (data: Params) => http.Post("/skin", data);
/** @description: 添加皮肤类型 */
export const addSkinType = (data: Params) => http.Post("/skinType", data);
/** @description: 添加技能效果 */
export const addSkillEffect = (data: Params) => http.Post("/skillEffect", data);
/** @description: 添加技能类型 */
export const addSkillType = (data: Params) => http.Post("/skillType", data);
/** @description: 添加关系 */
export const addRelation = (data: Params) => http.Post("/relation", data);
/** @description: 添加关系类型 */
export const addRelationType = (data: Params) => http.Post("/relationType", data);
/** @description: 添加职业类型 */
export const addProfessionType = (data: Params) => http.Post("/professionType", data);
/** @description: 添加阵营类型 */
export const addCampType = (data: Params) => http.Post("/campType", data);
/** @description: 添加能量类型 */
export const addEnergyType = (data: Params) => http.Post("/energyType", data);
/** @description: 添加定位类型 */
export const addLocationType = (data: Params) => http.Post("/locationType", data);
/** @description: 添加时期类型 */
export const addPeriodType = (data: Params) => http.Post("/periodType", data);
/** @description: 添加特长类型 */
export const addSpecialtyType = (data: Params) => http.Post("/specialtyType", data);
/** @description: 添加装备 */
export const addEquip = (data: Params) => http.Post("/equip", data);
/** @description: 添加装备类型 */
export const addEquipType = (data: Params) => http.Post("/equipType", data);
/** @description: 添加装备效果 */
export const addEquipEffect = (data: Params) => http.Post("/equipEffect", data);
/** @description: 添加铭文 */
export const addEpigraph = (data: Params) => http.Post("/epigraph", data);
/** @description: 添加铭文类型 */
export const addEpigraphType = (data: Params) => http.Post("/epigraphType", data);
/** @description: 添加铭文效果 */
export const addEpigraphEffect = (data: Params) => http.Post("/epigraphEffect", data);

/* PATCH请求 */
/** @description: 修改英雄基础列表 */
export const updateHeroList = (id: number, data: any) => http.Patch(`/heroList/${id}`, data);
/** @description: 修改英雄 */
export const updateHero = (id: number, data: any) => http.Patch(`/hero/${id}`, data);
/** @description: 修改皮肤 */
export const updateSkin = (id: number, data: any) => http.Patch(`/skin/${id}`, data);
/** @description: 修改皮肤类型 */
export const updateSkinType = (id: number, data: any) => http.Patch(`/skinType/${id}`, data);
/** @description: 修改技能效果 */
export const updateSkillEffect = (id: number, data: any) => http.Patch(`/skillEffect/${id}`, data);
/** @description: 修改技能类型 */
export const updateSkillType = (id: number, data: any) => http.Patch(`/skillType/${id}`, data);
/** @description: 修改关系 */
export const updateRelation = (id: number, data: any) => http.Patch(`/relation/${id}`, data);
/** @description: 修改关系类型 */
export const updateRelationType = (id: number, data: any) => http.Patch(`/relationType/${id}`, data);
/** @description: 修改职业类型 */
export const updateProfessionType = (id: number, data: any) => http.Patch(`/professionType/${id}`, data);
/** @description: 修改阵营类型 */
export const updateCampType = (id: number, data: any) => http.Patch(`/campType/${id}`, data);
/** @description: 修改能量类型 */
export const updateEnergyType = (id: number, data: any) => http.Patch(`/energyType/${id}`, data);
/** @description: 修改定位类型 */
export const updateLocationType = (id: number, data: any) => http.Patch(`/locationType/${id}`, data);
/** @description: 修改时期类型 */
export const updatePeriodType = (id: number, data: any) => http.Patch(`/periodType/${id}`, data);
/** @description: 修改特长类型 */
export const updateSpecialtyType = (id: number, data: any) => http.Patch(`/specialtyType/${id}`, data);
/** @description: 修改装备 */
export const updateEquip = (id: number, data: any) => http.Patch(`/equip/${id}`, data);
/** @description: 修改装备类型 */
export const updateEquipType = (id: number, data: any) => http.Patch(`/equipType/${id}`, data);
/** @description: 修改装备效果 */
export const updateEquipEffect = (id: number, data: any) => http.Patch(`/equipEffect/${id}`, data);
/** @description: 修改铭文 */
export const updateEpigraph = (id: number, data: any) => http.Patch(`/epigraph/${id}`, data);
/** @description: 修改铭文类型 */
export const updateEpigraphType = (id: number, data: any) => http.Patch(`/epigraphType/${id}`, data);
/** @description: 修改铭文效果 */
export const updateEpigraphEffect = (id: number, data: any) => http.Patch(`/epigraphEffect/${id}`, data);

/* DELETE请求 */
/** @description: 删除英雄基础列表 */
export const delHeroList = (id: number) => http.Del(`/heroList/${id}`);
/** @description: 删除英雄 */
export const delHero = (id: number) => http.Del(`/hero/${id}`);
/** @description: 删除皮肤 */
export const delSkin = (id: number) => http.Del(`/skin/${id}`);
/** @description: 删除皮肤类型 */
export const delSkinType = (id: number) => http.Del(`/skinType/${id}`);
/** @description: 删除技能效果 */
export const delSkillEffect = (id: number) => http.Del(`/skillEffect/${id}`);
/** @description: 删除技能类型 */
export const delSkillType = (id: number) => http.Del(`/skillType/${id}`);
//解除关系
export const delRelation = (id: number) => http.Del(`/relation/${id}`);
/** @description: 删除关系类型 */
export const delRelationType = (id: number) => http.Del(`/relationType/${id}`);
/** @description: 删除职业类型 */
export const delProfessionType = (id: number) => http.Del(`/professionType/${id}`);
/** @description: 删除阵营类型 */
export const delCampType = (id: number) => http.Del(`/campType/${id}`);
/** @description: 删除能量类型 */
export const delEnergyType = (id: number) => http.Del(`/energyType/${id}`);
/** @description: 删除定位类型 */
export const delLocationType = (id: number) => http.Del(`/locationType/${id}`);
/** @description: 删除时期类型 */
export const delPeriodType = (id: number) => http.Del(`/periodType/${id}`);
/** @description: 删除特长类型 */
export const delSpecialtyType = (id: number) => http.Del(`/specialtyType/${id}`);
/** @description: 删除装备 */
export const delEquip = (id: number) => http.Del(`/equip/${id}`);
/** @description: 删除装备类型 */
export const delEquipType = (id: number) => http.Del(`/equipType/${id}`);
/** @description: 删除装备效果 */
export const delEquipEffect = (id: number) => http.Del(`/equipEffect/${id}`);
/** @description: 删除铭文 */
export const delEpigraph = (id: number) => http.Del(`/epigraph/${id}`);
/** @description: 删除铭文类型 */
export const delEpigraphType = (id: number) => http.Del(`/epigraphType/${id}`);
/** @description: 删除铭文效果 */
export const delEpigraphEffect = (id: number) => http.Del(`/epigraphEffect/${id}`);

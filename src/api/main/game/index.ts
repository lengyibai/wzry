import { getReq, postReq, patchReq, deleteReq } from '@/api/network';
import { Hero } from '@/interface/hero'

interface Params {
  id: Number
}
/* GET请求 */
//获取英雄基础列表
export const getHeroList = (data: Params) => getReq('/heroList', data);
//获取英雄
export const getHero = (data: Params) => getReq('/hero', data);
//获取皮肤
export const getSkin = (data: Params) => getReq(`/skin${ data ? `?hero=${ data.id }` : '' }`);
//获取皮肤类型
export const getSkinType = (data: Params) => getReq('/skinType', data);
//获取技能效果
export const getSkillEffect = (data: Params) => getReq('/skillEffect', data);
//获取技能类型
export const getSkillType = (data: Params) => getReq('/skillType', data);
//获取关系表
export const getRelation = (data: Params) => getReq('/relation', data);
//获取职业类型
export const getProfessionType = (data: Params) => getReq('/professionType', data);
//获取阵营类型
export const getCampType = (data: Params) => getReq('/campType', data);
//获取能量类型
export const getEnergyType = (data: Params) => getReq('/energyType', data);
//获取定位类型
export const getLocationType = (data: Params) => getReq('/locationType', data);
//获取时期类型
export const getPeriodType = (data: Params) => getReq('/periodType', data);
//获取特长类型
export const getSpecialtyType = (data: Params) => getReq('/specialtyType', data);
//获取装备
export const getEquip = (data?: Params) => getReq('/equip', data);
//获取装备类型
export const getEquipType = (data: Params) => getReq('/equipType', data);
//获取装备效果
export const getEquipEffect = (data: Params) => getReq('/equipEffect', data);
//获取铭文
export const getEpigraph = (data: Params) => getReq('/epigraph', data);
//获取铭文类型
export const getEpigraphType = (data: Params) => getReq('/epigraphType', data);
//获取铭文效果
export const getEpigraphEffect = (data: Params) => getReq('/epigraphEffect', data);

/* POST请求 */
//添加英雄基础列表
export const addHeroList = (data: Params) => postReq('/heroList', data);
//添加英雄
export const addHero = (data: Params) => postReq('/hero', data);
//添加皮肤
export const addSkin = (data: Params) => postReq('/skin', data);
//添加皮肤类型
export const addSkinType = (data: Params) => postReq('/skinType', data);
//添加技能效果
export const addSkillEffect = (data: Params) => postReq('/skillEffect', data);
//添加技能类型
export const addSkillType = (data: Params) => postReq('/skillType', data);
//添加关系
export const addRelation = (data: Params) => postReq('/relation', data);
//添加关系类型
export const addRelationType = (data: Params) => postReq('/relationType', data);
//添加职业类型
export const addProfessionType = (data: Params) => postReq('/professionType', data);
//添加阵营类型
export const addCampType = (data: Params) => postReq('/campType', data);
//添加能量类型
export const addEnergyType = (data: Params) => postReq('/energyType', data);
//添加定位类型
export const addLocationType = (data: Params) => postReq('/locationType', data);
//添加时期类型
export const addPeriodType = (data: Params) => postReq('/periodType', data);
//添加特长类型
export const addSpecialtyType = (data: Params) => postReq('/specialtyType', data);
//添加装备
export const addEquip = (data: Params) => postReq('/equip', data);
//添加装备类型
export const addEquipType = (data: Params) => postReq('/equipType', data);
//添加装备效果
export const addEquipEffect = (data: Params) => postReq('/equipEffect', data);
//添加铭文
export const addEpigraph = (data: Params) => postReq('/epigraph', data);
//添加铭文类型
export const addEpigraphType = (data: Params) => postReq('/epigraphType', data);
//添加铭文效果
export const addEpigraphEffect = (data: Params) => postReq('/epigraphEffect', data);


/* PATCH请求 */
//修改英雄基础列表
export const updateHeroList = (id: number, data: any) => patchReq(`/heroList/${ id }`, data);
//修改英雄
export const updateHero = (id: number, data: any) => patchReq(`/hero/${ id }`, data);
//修改皮肤
export const updateSkin = (id: number, data: any) => patchReq(`/skin/${ id }`, data);
//修改皮肤类型
export const updateSkinType = (id: number, data: any) => patchReq(`/skinType/${ id }`, data);
//修改技能效果
export const updateSkillEffect = (id: number, data: any) => patchReq(`/skillEffect/${ id }`, data);
//修改技能类型
export const updateSkillType = (id: number, data: any) => patchReq(`/skillType/${ id }`, data);
//修改关系
export const updateRelation = (id: number, data: any) => patchReq(`/relation/${ id }`, data);
//修改关系类型
export const updateRelationType = (id: number, data: any) => patchReq(`/relationType/${ id }`, data);
//修改职业类型
export const updateProfessionType = (id: number, data: any) => patchReq(`/professionType/${ id }`, data);
//修改阵营类型
export const updateCampType = (id: number, data: any) => patchReq(`/campType/${ id }`, data);
//修改能量类型
export const updateEnergyType = (id: number, data: any) => patchReq(`/energyType/${ id }`, data);
//修改定位类型
export const updateLocationType = (id: number, data: any) => patchReq(`/locationType/${ id }`, data);
//修改时期类型
export const updatePeriodType = (id: number, data: any) => patchReq(`/periodType/${ id }`, data);
//修改特长类型
export const updateSpecialtyType = (id: number, data: any) => patchReq(`/specialtyType/${ id }`, data);
//修改装备
export const updateEquip = (id: number, data: any) => patchReq(`/equip/${ id }`, data);
//修改装备类型
export const updateEquipType = (id: number, data: any) => patchReq(`/equipType/${ id }`, data);
//修改装备效果
export const updateEquipEffect = (id: number, data: any) => patchReq(`/equipEffect/${ id }`, data);
//修改铭文
export const updateEpigraph = (id: number, data: any) => patchReq(`/epigraph/${ id }`, data);
//修改铭文类型
export const updateEpigraphType = (id: number, data: any) => patchReq(`/epigraphType/${ id }`, data);
//修改铭文效果
export const updateEpigraphEffect = (id: number, data: any) => patchReq(`/epigraphEffect/${ id }`, data);

/* DELETE请求 */
//删除英雄基础列表
export const delHeroList = (id: number) => deleteReq(`/heroList/${ id }`);
//删除英雄
export const delHero = (id: number) => deleteReq(`/hero/${ id }`);
//删除皮肤
export const delSkin = (id: number) => deleteReq(`/skin/${ id }`);
//删除皮肤类型
export const delSkinType = (id: number) => deleteReq(`/skinType/${ id }`);
//删除技能效果
export const delSkillEffect = (id: number) => deleteReq(`/skillEffect/${ id }`);
//删除技能类型
export const delSkillType = (id: number) => deleteReq(`/skillType/${ id }`);
//解除关系
export const delRelation = (id: number) => deleteReq(`/relation/${ id }`);
//删除关系类型
export const delRelationType = (id: number) => deleteReq(`/relationType/${ id }`);
//删除职业类型
export const delProfessionType = (id: number) => deleteReq(`/professionType/${ id }`);
//删除阵营类型
export const delCampType = (id: number) => deleteReq(`/campType/${ id }`);
//删除能量类型
export const delEnergyType = (id: number) => deleteReq(`/energyType/${ id }`);
//删除定位类型
export const delLocationType = (id: number) => deleteReq(`/locationType/${ id }`);
//删除时期类型
export const delPeriodType = (id: number) => deleteReq(`/periodType/${ id }`);
//删除特长类型
export const delSpecialtyType = (id: number) => deleteReq(`/specialtyType/${ id }`);
//删除装备
export const delEquip = (id: number) => deleteReq(`/equip/${ id }`);
//删除装备类型
export const delEquipType = (id: number) => deleteReq(`/equipType/${ id }`);
//删除装备效果
export const delEquipEffect = (id: number) => deleteReq(`/equipEffect/${ id }`);
//删除铭文
export const delEpigraph = (id: number) => deleteReq(`/epigraph/${ id }`);
//删除铭文类型
export const delEpigraphType = (id: number) => deleteReq(`/epigraphType/${ id }`);
//删除铭文效果
export const delEpigraphEffect = (id: number) => deleteReq(`/epigraphEffect/${ id }`);

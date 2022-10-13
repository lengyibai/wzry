import { getReq, postReq, patchReq, deleteReq } from '@/api/network';

/* GET请求 */
//获取英雄基础列表
export const getHeroList = (data) => getReq('/heroList', data);
//获取英雄
export const getHero = (data) => getReq('/hero', data);
//获取皮肤
export const getSkin = (data) => getReq(`/skin${data ? `?hero=${data.id}` : ''}`);
//获取皮肤类型
export const getSkinType = (data) => getReq('/skinType', data);
//获取技能效果
export const getSkillEffect = (data) => getReq('/skillEffect', data);
//获取技能类型
export const getSkillType = (data) => getReq('/skillType', data);
//获取关系表
export const getRelation = (data) => getReq('/relation', data);
//获取职业类型
export const getProfessionType = (data) => getReq('/professionType', data);
//获取阵营类型
export const getCampType = (data) => getReq('/campType', data);
//获取能量类型
export const getEnergyType = (data) => getReq('/energyType', data);
//获取定位类型
export const getLocationType = (data) => getReq('/locationType', data);
//获取时期类型
export const getPeriodType = (data) => getReq('/periodType', data);
//获取特长类型
export const getSpecialtyType = (data) => getReq('/specialtyType', data);
//获取装备
export const getEquip = (data) => getReq('/equip', data);
//获取装备类型
export const getEquipType = (data) => getReq('/equipType', data);
//获取装备效果
export const getEquipEffect = (data) => getReq('/equipEffect', data);
//获取铭文
export const getEpigraph = (data) => getReq('/epigraph', data);
//获取铭文类型
export const getEpigraphType = (data) => getReq('/epigraphType', data);
//获取铭文效果
export const getEpigraphEffect = (data) => getReq('/epigraphEffect', data);

/* POST请求 */
//添加英雄基础列表
export const addHeroList = (data) => postReq('/heroList', data);
//添加英雄
export const addHero = (data) => postReq('/hero', data);
//添加皮肤
export const addSkin = (data) => postReq('/skin', data);
//添加皮肤类型
export const addSkinType = (data) => postReq('/skinType', data);
//添加技能效果
export const addSkillEffect = (data) => postReq('/skillEffect', data);
//添加技能类型
export const addSkillType = (data) => postReq('/skillType', data);
//添加关系
export const addRelation = (data) => postReq('/relation', data);
//添加关系类型
export const addRelationType = (data) => postReq('/relationType', data);
//添加职业类型
export const addProfessionType = (data) => postReq('/professionType', data);
//添加阵营类型
export const addCampType = (data) => postReq('/campType', data);
//添加能量类型
export const addEnergyType = (data) => postReq('/energyType', data);
//添加定位类型
export const addLocationType = (data) => postReq('/locationType', data);
//添加时期类型
export const addPeriodType = (data) => postReq('/periodType', data);
//添加特长类型
export const addSpecialtyType = (data) => postReq('/specialtyType', data);
//添加装备
export const addEquip = (data) => postReq('/equip', data);
//添加装备类型
export const addEquipType = (data) => postReq('/equipType', data);
//添加装备效果
export const addEquipEffect = (data) => postReq('/equipEffect', data);
//添加铭文
export const addEpigraph = (data) => postReq('/epigraph', data);
//添加铭文类型
export const addEpigraphType = (data) => postReq('/epigraphType', data);
//添加铭文效果
export const addEpigraphEffect = (data) => postReq('/epigraphEffect', data);


/* PATCH请求 */
//修改英雄基础列表
export const updateHeroList = (id, data) => patchReq(`/heroList/${id}`, data);
//修改英雄
export const updateHero = (id, data) => patchReq(`/hero/${id}`, data);
//修改皮肤
export const updateSkin = (id, data) => patchReq(`/skin/${id}`, data);
//修改皮肤类型
export const updateSkinType = (id, data) => patchReq(`/skinType/${id}`, data);
//修改技能效果
export const updateSkillEffect = (id, data) => patchReq(`/skillEffect/${id}`, data);
//修改技能类型
export const updateSkillType = (id, data) => patchReq(`/skillType/${id}`, data);
//修改关系
export const updateRelation = (id, data) => patchReq(`/relation/${id}`, data);
//修改关系类型
export const updateRelationType = (id, data) => patchReq(`/relationType/${id}`, data);
//修改职业类型
export const updateProfessionType = (id, data) => patchReq(`/professionType/${id}`, data);
//修改阵营类型
export const updateCampType = (id, data) => patchReq(`/campType/${id}`, data);
//修改能量类型
export const updateEnergyType = (id, data) => patchReq(`/energyType/${id}`, data);
//修改定位类型
export const updateLocationType = (id, data) => patchReq(`/locationType/${id}`, data);
//修改时期类型
export const updatePeriodType = (id, data) => patchReq(`/periodType/${id}`, data);
//修改特长类型
export const updateSpecialtyType = (id, data) => patchReq(`/specialtyType/${id}`, data);
//修改装备
export const updateEquip = (id, data) => patchReq(`/equip/${id}`, data);
//修改装备类型
export const updateEquipType = (id, data) => patchReq(`/equipType/${id}`, data);
//修改装备效果
export const updateEquipEffect = (id, data) => patchReq(`/equipEffect/${id}`, data);
//修改铭文
export const updateEpigraph = (id, data) => patchReq(`/epigraph/${id}`, data);
//修改铭文类型
export const updateEpigraphType = (id, data) => patchReq(`/epigraphType/${id}`, data);
//修改铭文效果
export const updateEpigraphEffect = (id, data) => patchReq(`/epigraphEffect/${id}`, data);

/* DELETE请求 */
//删除英雄基础列表
export const delHeroList = (id) => deleteReq(`/heroList/${id}`);
//删除英雄
export const delHero = (id) => deleteReq(`/hero/${id}`);
//删除皮肤
export const delSkin = (id) => deleteReq(`/skin/${id}`);
//删除皮肤类型
export const delSkinType = (id) => deleteReq(`/skinType/${id}`);
//删除技能效果
export const delSkillEffect = (id) => deleteReq(`/skillEffect/${id}`);
//删除技能类型
export const delSkillType = (id) => deleteReq(`/skillType/${id}`);
//解除关系
export const delRelation = (id) => deleteReq(`/relation/${id}`);
//删除关系类型
export const delRelationType = (id) => deleteReq(`/relationType/${id}`);
//删除职业类型
export const delProfessionType = (id) => deleteReq(`/professionType/${id}`);
//删除阵营类型
export const delCampType = (id) => deleteReq(`/campType/${id}`);
//删除能量类型
export const delEnergyType = (id) => deleteReq(`/energyType/${id}`);
//删除定位类型
export const delLocationType = (id) => deleteReq(`/locationType/${id}`);
//删除时期类型
export const delPeriodType = (id) => deleteReq(`/periodType/${id}`);
//删除特长类型
export const delSpecialtyType = (id) => deleteReq(`/specialtyType/${id}`);
//删除装备
export const delEquip = (id) => deleteReq(`/equip/${id}`);
//删除装备类型
export const delEquipType = (id) => deleteReq(`/equipType/${id}`);
//删除装备效果
export const delEquipEffect = (id) => deleteReq(`/equipEffect/${id}`);
//删除铭文
export const delEpigraph = (id) => deleteReq(`/epigraph/${id}`);
//删除铭文类型
export const delEpigraphType = (id) => deleteReq(`/epigraphType/${id}`);
//删除铭文效果
export const delEpigraphEffect = (id) => deleteReq(`/epigraphEffect/${id}`);

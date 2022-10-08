import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取技能类型········####//
export const getSkillType = (data) => getReq('/skillType', data);

//#####··········POST请求··········#####//
//####········添加技能类型········####//
export const addSkillType = (data) => postReq('/skillType', data);

//#####··········PATCH请求··········#####//
//####········修改技能类型········####//
export const updateSkillType = (id, data) => patchReq(`/skillType/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除技能类型········####//
export const delSkillType = (id) => deleteReq(`/skillType/${id}`);

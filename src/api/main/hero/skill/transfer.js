import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取技能········####//
export const getSkills = (data) => getReq('/skill', data);

//#####··········POST请求··········#####//
//####········添加技能········####//
export const addSkill = (data) => postReq('/skill', data);

//#####··········PATCH请求··········#####//
//####········修改技能········####//
export const updateSkill = (id, data) => patchReq(`/skill/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除技能········####//
export const delSkill = (id) => deleteReq(`/skill/${id}`);

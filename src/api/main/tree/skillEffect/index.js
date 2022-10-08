import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取技能效果········####//
export const getSkillEffect = (data) => getReq('/skillEffect', data);

//#####··········POST请求··········#####//
//####········添加技能效果········####//
export const addSkillEffect = (data) => postReq('/skillEffect', data);

//#####··········PATCH请求··········#####//
//####········修改技能效果········####//
export const updateSkillEffect = (id, data) => patchReq(`/skillEffect/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除技能效果········####//
export const delSkillEffect = (id) => deleteReq(`/skillEffect/${id}`);

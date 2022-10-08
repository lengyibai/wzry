import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取关系表········####//
export const getRelation = (data) => getReq('/relation', data);

//#####··········POST请求··········#####//
//####········添加关系········####//
export const addRelation = (data) => postReq('/relation', data);

//#####··········PATCH请求··········#####//
//####········修改关系········####//
export const updateRelation = (id, data) => patchReq(`/relation/${id}`, data);

//#####··········DELETE请求··········#####//
//####········解除关系········####//
export const delRelation = (id) => deleteReq(`/relation/${id}`);

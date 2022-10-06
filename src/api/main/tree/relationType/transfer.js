import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取关系类型········####//
export const getRelationTypes = (data) => getReq('/relationType', data);

//#####··········POST请求··········#####//
//####········添加关系类型········####//
export const addRelationType = (data) => postReq('/relationType', data);

//#####··········PATCH请求··········#####//
//####········修改关系类型········####//
export const updateRelationType = (id, data) => patchReq(`/relationType/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除关系类型········####//
export const delRelationType = (id) => deleteReq(`/relationType/${id}`);

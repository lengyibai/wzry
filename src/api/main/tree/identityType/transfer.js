import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取身份类型········####//
export const getIdentityTypes = (data) => getReq('/identityType', data);

//#####··········POST请求··········#####//
//####········添加身份类型········####//
export const addIdentityType = (data) => postReq('/identityType', data);

//#####··········PATCH请求··········#####//
//####········修改身份类型········####//
export const updateIdentityType = (id, data) => patchReq(`/identityType/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除身份类型········####//
export const delIdentityType = (id) => deleteReq(`/identityType/${id}`);

import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取特长类型········####//
export const getSpecialtyType = (data) => getReq('/specialtyType', data);

//#####··········POST请求··········#####//
//####········添加特长类型········####//
export const addSpecialtyType = (data) => postReq('/specialtyType', data);

//#####··········PATCH请求··········#####//
//####········修改特长类型········####//
export const updateSpecialtyType = (id, data) => patchReq(`/specialtyType/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除特长类型········####//
export const delSpecialtyType = (id) => deleteReq(`/specialtyType/${id}`);

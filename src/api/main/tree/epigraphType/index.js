import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取铭文类型········####//
export const getEpigraphType = (data) => getReq('/epigraphType', data);

//#####··········POST请求··········#####//
//####········添加铭文类型········####//
export const addEpigraphType = (data) => postReq('/epigraphType', data);

//#####··········PATCH请求··········#####//
//####········修改铭文类型········####//
export const updateEpigraphType = (id, data) => patchReq(`/epigraphType/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除铭文类型········####//
export const delEpigraphType = (id) => deleteReq(`/epigraphType/${id}`);

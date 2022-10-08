import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取铭文········####//
export const getEpigraph = (data) => getReq('/epigraph', data);

//#####··········POST请求··········#####//
//####········添加铭文········####//
export const addEpigraph = (data) => postReq('/epigraph', data);

//#####··········PATCH请求··········#####//
//####········修改铭文········####//
export const updateEpigraph = (id, data) => patchReq(`/epigraph/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除铭文········####//
export const delEpigraph = (id) => deleteReq(`/epigraph/${id}`);

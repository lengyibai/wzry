import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取区域类型········####//
export const getAreaTypes = (data) => getReq('/areaType', data);

//#####··········POST请求··········#####//
//####········添加区域类型········####//
export const addAreaType = (data) => postReq('/areaType', data);

//#####··········PATCH请求··········#####//
//####········修改区域类型········####//
export const updateAreaType = (id, data) => patchReq(`/areaType/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除区域类型········####//
export const delAreaType = (id) => deleteReq(`/areaType/${id}`);

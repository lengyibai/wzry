import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取阵营类型········####//
export const getCampType = (data) => getReq('/campType', data);

//#####··········POST请求··········#####//
//####········添加阵营类型········####//
export const addCampType = (data) => postReq('/campType', data);

//#####··········PATCH请求··········#####//
//####········修改阵营类型········####//
export const updateCampType = (id, data) => patchReq(`/campType/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除阵营类型········####//
export const delCampType = (id) => deleteReq(`/campType/${id}`);

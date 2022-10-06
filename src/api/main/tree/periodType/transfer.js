import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取时期类型········####//
export const getPeriodTypes = (data) => getReq('/periodType', data);

//#####··········POST请求··········#####//
//####········添加时期类型········####//
export const addPeriodType = (data) => postReq('/periodType', data);

//#####··········PATCH请求··········#####//
//####········修改时期类型········####//
export const updatePeriodType = (id, data) => patchReq(`/periodType/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除时期类型········####//
export const delPeriodType = (id) => deleteReq(`/periodType/${id}`);

import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取定位类型········####//
export const getLocationType = (data) => getReq('/locationType', data);

//#####··········POST请求··········#####//
//####········添加定位类型········####//
export const addLocationType = (data) => postReq('/locationType', data);

//#####··········PATCH请求··········#####//
//####········修改定位类型········####//
export const updateLocationType = (id, data) => patchReq(`/locationType/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除定位类型········####//
export const delLocationType = (id) => deleteReq(`/locationType/${id}`);

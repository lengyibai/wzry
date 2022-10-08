import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取装备类型········####//
export const getEquipType = (data) => getReq('/equipType', data);

//#####··········POST请求··········#####//
//####········添加装备类型········####//
export const addEquipType = (data) => postReq('/equipType', data);

//#####··········PATCH请求··········#####//
//####········修改装备类型········####//
export const updateEquipType = (id, data) => patchReq(`/equipType/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除装备类型········####//
export const delEquipType = (id) => deleteReq(`/equipType/${id}`);

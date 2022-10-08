import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取装备········####//
export const getEquip = (data) => getReq('/equip', data);

//#####··········POST请求··········#####//
//####········添加装备········####//
export const addEquip = (data) => postReq('/equip', data);

//#####··········PATCH请求··········#####//
//####········修改装备········####//
export const updateEquip = (id, data) => patchReq(`/equip/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除装备········####//
export const delEquip = (id) => deleteReq(`/equip/${id}`);

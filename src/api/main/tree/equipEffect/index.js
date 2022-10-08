import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取装备效果········####//
export const getEquipEffect = (data) => getReq('/equipEffect', data);

//#####··········POST请求··········#####//
//####········添加装备效果········####//
export const addEquipEffect = (data) => postReq('/equipEffect', data);

//#####··········PATCH请求··········#####//
//####········修改装备效果········####//
export const updateEquipEffect = (id, data) => patchReq(`/equipEffect/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除装备效果········####//
export const delEquipEffect = (id) => deleteReq(`/equipEffect/${id}`);

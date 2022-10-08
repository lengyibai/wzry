import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取能量类型········####//
export const getEnergyType = (data) => getReq('/energyType', data);

//#####··········POST请求··········#####//
//####········添加能量类型········####//
export const addEnergyType = (data) => postReq('/energyType', data);

//#####··········PATCH请求··········#####//
//####········修改能量类型········####//
export const updateEnergyType = (id, data) => patchReq(`/energyType/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除能量类型········####//
export const delEnergyType = (id) => deleteReq(`/energyType/${id}`);

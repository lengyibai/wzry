import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取皮肤········####//
export const getSkin = (data) => getReq('/skin', data);

//#####··········POST请求··········#####//
//####········添加皮肤········####//
export const addSkin = (data) => postReq('/skin', data);

//#####··········PATCH请求··········#####//
//####········修改皮肤········####//
export const updateSkin = (id, data) => patchReq(`/skin/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除皮肤········####//
export const delSkin = (id) => deleteReq(`/skin/${id}`);

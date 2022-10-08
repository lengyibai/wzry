import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取职业类型········####//
export const getProfessionType = (data) => getReq('/professionType', data);

//#####··········POST请求··········#####//
//####········添加职业类型········####//
export const addProfessionType = (data) => postReq('/professionType', data);

//#####··········PATCH请求··········#####//
//####········修改职业类型········####//
export const updateProfessionType = (id, data) => patchReq(`/professionType/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除职业类型········####//
export const delProfessionType = (id) => deleteReq(`/professionType/${id}`);

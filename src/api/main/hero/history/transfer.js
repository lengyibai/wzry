import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取历史故事········####//
export const getHistorys = (data) => getReq('/history', data);

//#####··········POST请求··········#####//
//####········添加历史故事········####//
export const addHistory = (data) => postReq('/history', data);

//#####··········PATCH请求··········#####//
//####········修改历史故事········####//
export const updateHistory = (id, data) => patchReq(`/history/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除历史故事········####//
export const delHistory = (id) => deleteReq(`/history/${id}`);

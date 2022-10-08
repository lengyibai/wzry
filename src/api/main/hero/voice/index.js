import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取语音········####//
export const getVoice = (data) => getReq('/voice', data);

//#####··········POST请求··········#####//
//####········添加语音········####//
export const addVoice = (data) => postReq('/voice', data);

//#####··········PATCH请求··········#####//
//####········修改语音········####//
export const updateVoice = (id, data) => patchReq(`/voice/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除语音········####//
export const delVoice = (id) => deleteReq(`/voice/${id}`);

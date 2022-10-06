import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network/index.js';

//#####··········GET请求··········#####//
//####········获取用户信息········####//
export const getUserInfo = (data = {}) => getReq('/user', data);

//#####··········POST请求··········#####//
//####········注册用户········####//
export const addUser = (data) => postReq('/user', data);

//#####··········PATCH请求··········#####//
//####········修改用户信息········####//
export const updateUser = (id, data) => patchReq(`/user/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除用户········####//
export const delUser = (id) => deleteReq(`/user/${id}`);

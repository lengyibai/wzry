import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取英雄基础列表········####//
export const getHeroList = (data) => getReq('/heroList', data);

//#####··········POST请求··········#####//
//####········添加英雄基础列表········####//
export const addHeroList = (data) => postReq('/heroList', data);

//#####··········PATCH请求··········#####//
//####········修改英雄基础列表········####//
export const updateHeroList = (id, data) => patchReq(`/heroList/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除英雄基础列表········####//
export const delHeroList = (id) => deleteReq(`/heroList/${id}`);

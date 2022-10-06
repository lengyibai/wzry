import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
// let { id, _page, _limit, token } = data;
//####········获取英雄········####//
export const getHeros = (data) => getReq('/hero', data);

//#####··········POST请求··········#####//
//####········添加英雄········####//
export const addHero = (data) => postReq('/hero', data);

//#####··········PATCH请求··········#####//
//####········修改英雄········####//
export const updateHero = (id, data) => patchReq(`/hero/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除英雄········####//
export const delHero = (id) => deleteReq(`/hero/${id}`);

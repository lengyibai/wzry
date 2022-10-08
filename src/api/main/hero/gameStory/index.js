import {
  getReq, postReq, patchReq, deleteReq,
} from '@/api/network';

//#####··········GET请求··········#####//
//####········获取英雄故事········####//
export const getGameStory = (data) => getReq('/gameStory', data);

//#####··········POST请求··········#####//
//####········添加英雄故事········####//
export const addGameStory = (data) => postReq('/gameStory', data);

//#####··········PATCH请求··········#####//
//####········修改英雄故事········####//
export const updateGameStory = (id, data) => patchReq(`/gameStory/${id}`, data);

//#####··········DELETE请求··········#####//
//####········删除英雄故事········####//
export const delGameStory = (id) => deleteReq(`/gameStory/${id}`);

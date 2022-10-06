//#####··········资料聚合处理··········#####//
/* 详细信息 */
//英雄故事
import { getGameStory } from '@/api/main/hero/gameStory';
//历史故事
import { getHistory } from '@/api/main/hero/history';
//语音列表
import { getVoice } from '@/api/main/hero/voice';
//皮肤列表
import { getSkin } from '@/api/main/hero/skin';
//技能列表
import { getSkill } from '@/api/main/hero/skill';

//#####········获取英雄列表········#####//
import { getHeros } from './transfer.js';

export const hero = (data) => new Promise((resolve) => {
  getHeros(data).then(async (res) => {
    if (data) {
      const params = { id: data.id };

      /* 详细信息 */
      const k2 = ['voices', 'skins', 'skills', 'gameStory', 'history'];
      const r2 = [getVoice, getSkin, getSkill, getGameStory, getHistory];
      for (let i = 0; i < r2.length; i++) {
        res.data[0][k2[i]] = await r2[i](params);
      }

      resolve(res.data[0]);
    } else {
      resolve(res.data);
    }
  });
});

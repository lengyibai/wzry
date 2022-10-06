import { getSkillEffects } from './transfer.js';

//#####········获取技能效果········#####//
export const getSkillEffect = (data) => new Promise((resolve) => {
  getSkillEffects(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

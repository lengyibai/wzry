import { getSkillTypes } from './transfer.js';

//#####········获取技能类型········#####//
export const getSkillType = (data) => new Promise((resolve) => {
  getSkillTypes(data).then((res) => (data ? resolve(res.data[0].name) : resolve(res.data)));
});

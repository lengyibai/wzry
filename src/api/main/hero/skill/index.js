//#####········获取技能········#####//
import { getSkills } from './transfer.js';

export const getSkill = (data) => new Promise((resolve) => {
  getSkills(data).then(async (res) => {
    if (data) {
      resolve(res.data[0]?.data);
    } else {
      resolve(res.data);
    }
  });
});

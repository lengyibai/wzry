import { get } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取英雄技能列表 */
export const getHeroSkill = () => {
  const skill_list = get<Hero.SkillParams[]>({
    name: CONFIG.LOCAL_KEY.SKILL,
  });
  return Promise.resolve(skill_list);
};

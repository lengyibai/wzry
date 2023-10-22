import { get, post } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取指定英雄技能 */
export const getHeroSkill = (hero_id: number) => {
  const hero_skill = get<Hero.SkillParams>({
    name: CONFIG.LOCAL_KEY.SKILL,
    key: "id",
    value: hero_id,
  });
  return Promise.resolve(hero_skill?.skills || []);
};

/** @description 添加英雄技能 */
export const addHeroSkill = (skill: Hero.SkillParams) => {
  const hero_skill = post<Hero.SkillParams>(CONFIG.LOCAL_KEY.SKILL, skill);
  return Promise.resolve(hero_skill);
};

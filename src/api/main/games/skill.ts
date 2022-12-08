import { get, post } from "@/api/helper/transfer";

/** @description: 获取指定英雄技能 */
export const getHeroSkill = (id: number) => {
  return Promise.resolve(get<Hero.SkillParams>({ name: "data_skill", key: "id", value: id }).skills);
};

/** @description: 添加英雄技能 */
export const addHeroSkill = (data: Hero.SkillParams) => {
  return Promise.resolve(post<Hero.SkillParams>("data_skill", data));
};

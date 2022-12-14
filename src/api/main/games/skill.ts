import { get, post } from "@/api/helper/transfer";

/** @description: 获取指定英雄技能 */
export const getHeroSkill = (id: number) => {
  const data = get<Hero.SkillParams>({ name: "data_skill", key: "id", value: id });
  return Promise.resolve(data.skills || []);
};

/** @description: 添加英雄技能 */
export const addHeroSkill = (data: Hero.SkillParams) => {
  return Promise.resolve(post<Hero.SkillParams>("data_skill", data));
};

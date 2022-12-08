import { get } from "@/api/helper/transfer";

interface SkillType {
  id: number;
  skills: Hero.Skill[];
}

/** @description: 获取指定英雄技能 */
export const getHeroSkill = (id: number) => {
  return Promise.resolve(get<SkillType>({ name: "data_skill", key: "id", value: id }).skills);
};

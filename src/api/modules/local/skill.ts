import { get } from "@/api/helper/transfer";
import { LOCAL_KEY } from "@/config/modules/local-key";

/** @description 获取技能列表 */
export const getSkillList = () => {
  return get<Remote.Skill.Data[]>({ name: LOCAL_KEY.HERO_SKILL });
};

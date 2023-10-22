import { get } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取关系列表 */
export const getRelationship = () => {
  const relationship_list = get<Hero.Relationship[]>({ name: CONFIG.LOCAL_KEY.RELATIONSHIP });
  return Promise.resolve(relationship_list);
};

/** @description 获取指定英雄关系 */
export const getHeroRelationship = (hero_id: number) => {
  const Relationship = get<Hero.Relationship>({
    name: CONFIG.LOCAL_KEY.RELATIONSHIP,
    key: "id",
    value: hero_id,
  });
  return Promise.resolve(Relationship?.relationship);
};

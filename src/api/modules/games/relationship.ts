import { get } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取关系列表 */
export const getRelationship = () => Promise.resolve(get<Hero.Relationship[]>({ name: CONFIG.LOCAL_KEY.RELATIONSHIP }));

/**
 * @description 获取指定英雄关系
 * @param hero_id 英雄id
 */
export const getHeroRelationship = (hero_id: number) => {
  const Relationships = get<Hero.Relationship>({
    name: CONFIG.LOCAL_KEY.RELATIONSHIP,
    key: "id",
    value: hero_id,
  });
  return Promise.resolve(Relationships?.relationship);
};

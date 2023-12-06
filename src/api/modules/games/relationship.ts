import { get } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取关系列表 */
export const getRelationship = () => {
  const relationship_list = get<Hero.Relationship[]>({
    name: CONFIG.LOCAL_KEY.RELATIONSHIP,
  });
  return Promise.resolve(relationship_list);
};

/** @description 获取指定英雄关系 */
export const getHeroRelationship = (hero_id: number) => {
  const relationship = get<Hero.Relationship>({
    name: CONFIG.LOCAL_KEY.RELATIONSHIP,
    key: "id",
    value: hero_id,
  });
  return Promise.resolve(relationship?.relationships);
};

/**
 * @description 获取指定英雄在指定英雄的关系内的关系描述
 * @param hero_id 查询英雄id
 * @param child_id 查询到的英雄关系中二次查询关系的
 */
export const getHeroRelationshipDesc = (hero_id: number, child_id: number) => {
  const relationship = get<Hero.Relationship>({
    name: CONFIG.LOCAL_KEY.RELATIONSHIP,
    key: "id",
    value: hero_id,
  });
  const params = {
    name: CONFIG.LOCAL_KEY.HERO_DATA,
    key: "id",
    value: hero_id,
  };
  const hero = get<Hero.Data>(params);

  const target = relationship?.relationships.find((item) => item.id === child_id);
  return Promise.resolve({
    relation: target?.relation,
    desc: target?.desc,
    gender: hero.gender,
  });
};

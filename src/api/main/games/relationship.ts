import { get } from "@/api/helper/transfer";

/** @description: 获取关系列表 */
export const getRelationship = () => {
  return Promise.resolve(get<Hero.Relationship[]>({ name: "data_relationship" }));
};

/** @description: 获取指定英雄关系 */
export const getHeroRelationship = (id: number) => {
  const Relationships = get<Hero.Relationship>({ name: "data_relationship", key: "id", value: id });
  return Promise.resolve(Relationships.relationship);
};

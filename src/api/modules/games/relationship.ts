import { API_HERO } from "@/api";
import { get } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取关系列表 */
export const getRelationship = async () => {
  const relationship_list = get<Hero.Relationship[]>({
    name: CONFIG.LOCAL_KEY.RELATIONSHIP,
  });

  //创建id作为键的初始数据
  const base_data: Record<number, string> = {};
  relationship_list.forEach((hero) => {
    base_data[hero.id] = "";
  });

  //获取英雄名
  const hero_names = await API_HERO.getHeroName();
  hero_names.forEach((item) => {
    base_data[item.id] = item.name;
  });

  //整合数据
  relationship_list.forEach((hero) => {
    hero.name = base_data[hero.id];
  });

  return Promise.resolve(relationship_list);
};

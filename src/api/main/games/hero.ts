import { get } from "@/api/helper/transfer";
import { getHeroSkin } from "@/api/main/games/skin";

/** @description: 获取英雄列表 */
export const getHeroData = () => {
  return Promise.resolve(get<any, Hero.Data[]>({ name: "data_herodata" }));
};

/** @description: 获取英雄详情 */
export const getHeroDetail = async (id: string) => {
  const hero = get<string, Hero.Data>({ name: "data_herodata", key: "id", value: id });
  const skins = await getHeroSkin(id); //获取皮肤列表
  hero.skins = skins;
  return Promise.resolve(hero);
};

import { get } from "@/api/helper/transfer";

/** @description: 获取皮类型列表 */
export const getSkinType = () => {
  return Promise.resolve(get<Hero.SkinType[]>({ name: "data_skintype" }));
};

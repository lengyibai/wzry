import { get } from "@/api/helper/transfer";

/** @description 获取皮类型列表 */
export const getSkinType = () => Promise.resolve(get<Hero.SkinType[]>({ name: "data_skintype" }));

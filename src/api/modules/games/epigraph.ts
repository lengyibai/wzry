import { get } from "@/api/helper/transfer";

/** @description 获取铭文列表 */
export const getEpigraphList = () => Promise.resolve(get<Epigraph.Data[]>({ name: "data_epigraph" }));

import { get } from "@/api/helper/transfer";

/** @description 获取铭文列表 */
const getEpigraphList = () => Promise.resolve(get<Epigraph.Data[]>({ name: "data_epigraph" }));

export default { getEpigraphList };

import { useIndexedDB } from "@/hooks";

/** @description 查询本地数据库 */
export const get = async <R>(name: string, type: "BASE" | "VOICE" = "BASE") => {
  const { BaseData, VoiceData } = useIndexedDB();
  if (type === "BASE") {
    return (await BaseData.getItem<R>(name))!;
  }
  return (await VoiceData.getItem<R>(name))!;
};

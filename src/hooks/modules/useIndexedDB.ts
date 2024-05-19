import localforage from "localforage";

/** @description 英雄数据库 */
const BaseDatabase = localforage.createInstance({
  name: "王者图鉴基础数据",
});

/** @description 语音数据库 */
const VoiceDatabase = localforage.createInstance({
  name: "王者图鉴语音数据",
});

/** @description 使用浏览器数据库 */
const useIndexedDB = () => {
  const ExposeMethods = {
    /** @description 基础数据操作 */
    BaseData: {
      getItem: <T>(key: string) => BaseDatabase.getItem<T>(key),
      removeItem: (key: string) => BaseDatabase.removeItem(key),
      setItem: (key: string, data: unknown) => BaseDatabase.setItem(key, data),
    },
    /** @description 语音数据操作 */
    VoiceData: {
      getItem: <T>(key: string) => VoiceDatabase.getItem<T>(key),
      removeItem: (key: string) => VoiceDatabase.removeItem(key),
      setItem: (key: string, data: unknown) => VoiceDatabase.setItem(key, data),
    },
  };

  return {
    ...ExposeMethods,
  };
};

export { useIndexedDB };

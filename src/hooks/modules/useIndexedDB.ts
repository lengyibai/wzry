import localforage from "localforage";

/** @description 英雄数据库 */
const BaseDatabase = localforage.createInstance({
  name: "王者图鉴基础数据",
});

/** @description 语音数据库 */
const VoiceDatabase = localforage.createInstance({
  name: "王者图鉴语音数据",
});

/** @description 压缩包解压数据库 */
const ZipDatabase = localforage.createInstance({
  name: "王者图鉴解压数据",
});

/** @description 使用浏览器数据库 */
const useIndexedDB = () => {
  const ExposeMethods = {
    /** @description 基础数据操作 */
    BaseData: {
      getItem: <T>(key: string) => BaseDatabase.getItem<T>(key),
      removeItem: (key: string) => BaseDatabase.removeItem(key),
      setItem: (key: string, data: unknown) => BaseDatabase.setItem(key, data),
      clear: () => BaseDatabase.clear(),
    },
    /** @description 语音数据操作 */
    VoiceData: {
      getItem: <T>(key: string) => VoiceDatabase.getItem<T>(key),
      removeItem: (key: string) => VoiceDatabase.removeItem(key),
      setItem: (key: string, data: unknown) => VoiceDatabase.setItem(key, data),
      clear: () => VoiceDatabase.clear(),
    },
    /** @description 压缩包解压的数据操作 */
    ZipDatabase: {
      getItem: <T>(key: string) => ZipDatabase.getItem<T>(key),
      removeItem: (key: string) => ZipDatabase.removeItem(key),
      setItem: (key: string, data: unknown) => ZipDatabase.setItem(key, data),
      clear: () => ZipDatabase.clear(),
    },
  };

  return {
    ...ExposeMethods,
  };
};

export { useIndexedDB };

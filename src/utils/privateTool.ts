import { Base64 } from "js-base64";
import JSZip from "jszip";
import type { AxiosProgressEvent } from "axios";

import { $message } from "./busTransfer";
import { _imageOptimizer, _mergeConfig, _saveFiles } from "./tool";
import type { ZipType } from "./interface";

import { DEFAULT, GAME_CONFIG, MESSAGE_TIP } from "@/config";
import type { ResultData } from "@/api/interface";
import { useIndexedDB } from "@/hooks";

/** @description 选择并压缩头像 */
export const _selectAvatarCompress = (e: Event | File, cb: (v: string) => void) => {
  let file: File;
  if (e instanceof Event) {
    file = (e.target as HTMLInputElement).files![0];
  } else {
    file = e;
  }

  if (!file) return;

  if (![".png", ".jpg", ".jpeg"].some((item) => file.name.endsWith(item))) {
    $message(MESSAGE_TIP.a2k3, "error");
    return;
  }

  _imageOptimizer({
    file,
    width: 200,
    ratio: 0.75,
    maxSize: 100,
    success: (...data) => {
      cb(data[2]);
    },
    fail() {
      $message(MESSAGE_TIP.a2k3, "error");
    },
  });
};

/** @description 加密数据
 * @param data 需要加密的数据
 */
export const _encryption = (data: any) => {
  const encode_data = Base64.encode(JSON.stringify(data));
  const reversed_data = encode_data.split("").reverse().join("");
  return reversed_data;
};

/** @description 解密数据
 * @param data 需要解密的数据
 */
export const _decryption = (data: string) => {
  const reversed_data = data.split("").reverse().join("");
  const decode_data = Base64.decode(reversed_data);
  const config = _mergeConfig<User.Data>(JSON.parse(decode_data), DEFAULT.userInfoDefault());
  return config;
};

/** @description 导出卡片
 * @param data 卡片数据
 */
export const _exportCard = (data: User.Data) => {
  _saveFiles(_encryption(data), `召唤师卡-${data.username}.wzry`);
};

/** @description 熟练度等级计算
 * @param exp 熟练度
 */
export const _getExpLevel = (exp: number) => {
  if (exp >= GAME_CONFIG.UPGRADE_RANGE[0] && exp < GAME_CONFIG.UPGRADE_RANGE[1]) return 1;
  if (exp >= GAME_CONFIG.UPGRADE_RANGE[1] && exp < GAME_CONFIG.UPGRADE_RANGE[2]) return 2;
  if (exp >= GAME_CONFIG.UPGRADE_RANGE[2] && exp < GAME_CONFIG.UPGRADE_RANGE[3]) return 3;
  if (exp >= GAME_CONFIG.UPGRADE_RANGE[3] && exp < GAME_CONFIG.UPGRADE_RANGE[4]) return 4;
  return 5;
};

/** @description 根据补给时间返回对应颜色
 * @param time 补给时间
 */
export const _getSupplyColor = (time: number) => {
  if (time < 10 * 60) return "green";
  if (time >= 10 * 60 && time < 1 * 60 * 60) return "blue";
  if (time >= 1 * 60 * 60 && time <= 3 * 60 * 60) return "orange";
  return "red";
};

/** @description 下载压缩包
 * @param apiUrl 压缩包API地址
 * @param request 请求函数
 * @param version 压缩包版本
 * @param type 下载类型
 * @param callback 下载成功后回调
 */
export const _downloadZip = (
  apiUrl: string,
  request: (
    url: string,
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => void,
  ) => Promise<ResultData<Blob>>,
  version: string,
  type: ZipType,
  callback: (v: {
    size: string;
    downloaded_size: string;
    download_progress: string;
    decompression_progress: string;
    download_finish: boolean;
    decompression_finish: boolean;
  }) => void,
) => {
  const { ZipDatabase } = useIndexedDB();
  /** KB单位 */
  const BYTES_IN_KB = 1024;
  /** 图片链接 */
  const links: Record<string, string> = {};
  /** 用于匹配资源的正则 */
  let reg: RegExp;
  /** 下载及解压状态 */
  const status = {
    size: "正在计算...",
    downloaded_size: "0KB",
    download_progress: "0%",
    decompression_progress: "0%",
    download_finish: false,
    decompression_finish: false,
  };

  //根据类型使用正则
  if (
    [
      "IMAGE_ACTIVITY_BANNER",
      "IMAGE_BLUR",
      "IMAGE_HERO_AVATAR",
      "IMAGE_MINECRAFT",
      "IMAGE_MISC",
      "IMAGE_PROPS",
      "IMAGE_MINI_HERO",
    ].includes(type)
  ) {
    reg = /\.(jpg|png)$/i;
  } else if (type === "AUDIO") {
    reg = /\.(mp3)$/i;
  } else if (type === "VIDEO_HOME") {
    reg = /\.(mp4)$/i;
  } else if (["JSON_DATA", "JSON_VOICE"].includes(type)) {
    reg = /\.(json)$/i;
  }

  return new Promise<Record<string, string>>((resolve, reject) => {
    request(`${apiUrl}?t=${version}`, (e) => {
      /** 已下载大小 */
      const downloaded_size = e.loaded / BYTES_IN_KB;
      /** 总大小 */
      const total_size = e.total! / BYTES_IN_KB;

      status.size = total_size.toFixed(0) + "KB";
      status.downloaded_size = downloaded_size.toFixed(0) + "KB";
      status.download_progress = Math.round((e.loaded * 100) / e.total!) + "%";
      callback(status);
    })
      .then(async (res) => {
        status.download_finish = true;
        status.decompression_progress = "0%";

        /** 用于计算解压进度 */
        let finish_files = 0;
        const zip = await JSZip.loadAsync(res.data);
        const file_names = Object.keys(zip.files);
        const blob_cache: { version: string; data: { key: string; blob: Blob }[] } = {
          version,
          data: [],
        };

        //遍历文件名列表
        for (const fileName of file_names) {
          const load = async () => {
            const zipEntry = zip.files[fileName];

            //如果文件不是文件夹且文件名以指定扩展结尾
            if (!zipEntry.dir && fileName.match(reg)) {
              const originalFileName = fileName.replace(reg, "");
              const blob = await zip.files[fileName].async("blob");
              const url = URL.createObjectURL(blob);

              //记录解压后的Blob数据
              blob_cache.data.push({
                key: originalFileName,
                blob,
              });

              links[originalFileName] = url;
              finish_files++;
              status.decompression_progress =
                Math.round((finish_files / file_names.length) * 100) + "%";
              callback(status);
            }
          };
          await load();
        }

        ZipDatabase.setItem(type, blob_cache);

        status.decompression_finish = true;
        status.size = "正在计算...";
        status.downloaded_size = "0KB";
        status.download_progress = "0%";
        status.download_finish = false;
        callback(status);
        resolve(links);
      })
      .catch(reject);
  });
};

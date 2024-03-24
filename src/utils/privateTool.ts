import { Base64 } from "js-base64";
import JSZip from "jszip";
import { AxiosProgressEvent } from "axios";

import { $message } from "./busTransfer";
import { _imageOptimizer, _mergeConfig, _promiseTimeout, _saveFiles } from "./tool";

import { DEFAULT, GAME_CONFIG, MESSAGE_TIP } from "@/config";
import { ResultData } from "@/api/interface";

/** @description 选择并压缩头像 */
export const _selectAvatarCompress = (e: Event, cb: (v: string) => void) => {
  const file = (e.target as HTMLInputElement).files?.[0];

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

/** @description 加密数据 */
export const _encryption = (data: any) => {
  const encode_data = Base64.encode(JSON.stringify(data));
  const reversed_data = encode_data.split("").reverse().join("");
  return reversed_data;
};

/** @description 解密数据 */
export const _decryption = (v: string) => {
  const reversed_data = v.split("").reverse().join("");
  const decode_data = Base64.decode(reversed_data);
  const config = _mergeConfig<Global.UserData>(JSON.parse(decode_data), DEFAULT.userDefaultInfo());
  return config;
};

/** @description 导出卡片 */
export const _exportCard = (data: Global.UserData) => {
  _saveFiles(_encryption(data), `召唤师卡-${data.username}.wzry`);
};

/** @description 熟练度登记计算 */
export const _getExpLevel = (exp: number) => {
  if (exp >= GAME_CONFIG.UPGRADE_RANGE[0] && exp < GAME_CONFIG.UPGRADE_RANGE[1]) return 1;
  if (exp >= GAME_CONFIG.UPGRADE_RANGE[1] && exp < GAME_CONFIG.UPGRADE_RANGE[2]) return 2;
  if (exp >= GAME_CONFIG.UPGRADE_RANGE[2] && exp < GAME_CONFIG.UPGRADE_RANGE[3]) return 3;
  if (exp >= GAME_CONFIG.UPGRADE_RANGE[3] && exp < GAME_CONFIG.UPGRADE_RANGE[4]) return 4;
  return 5;
};

/** @description 根据补给时间返回对应颜色 */
export const _getSupplyColor = (time: number) => {
  if (time < 10 * 60) return "green";
  if (time >= 10 * 60 && time < 1 * 60 * 60) return "blue";
  if (time >= 1 * 60 * 60 && time <= 3 * 60 * 60) return "orange";
  return "red";
};

/** @description 下载压缩包 */
export const _downloadZip = (
  request: (
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => void,
  ) => Promise<ResultData<any>>,
  type: "IMG" | "BLUR" | "AUDIO",
  callback: (v: {
    zip_size: string;
    zip_downloaded_size: string;
    zip_download_progress: string;
    zip_decompression_progress: string;
    zip_download_finish: boolean;
    zip_decompression_finish: boolean;
  }) => void,
) => {
  /** KB单位 */
  const BYTES_IN_KB = 1024;
  /** 图片链接 */
  const links: Record<string, string> = {};
  /** 用于匹配资源的正则 */
  let reg: RegExp;
  /** 下载及解压状态 */
  const status = {
    zip_size: "",
    zip_downloaded_size: "",
    zip_download_progress: "",
    zip_decompression_progress: "",
    zip_download_finish: false,
    zip_decompression_finish: false,
  };

  //根据类型使用正则
  if (["IMG", "BLUR"].includes(type)) {
    reg = /\.(jpg|png)$/i;
  } else if (type === "AUDIO") {
    reg = /\.(mp3)$/i;
  }

  return new Promise<Record<string, string>>((resolve, reject) => {
    request((e) => {
      /** 已下载大小 */
      const downloaded_size = e.loaded / BYTES_IN_KB;
      /** 总大小 */
      const total_size = e.total! / BYTES_IN_KB;

      status.zip_size = total_size.toFixed(0) + "KB";
      status.zip_downloaded_size = downloaded_size.toFixed(0) + "KB";
      status.zip_download_progress = Math.round((e.loaded * 100) / e.total!) + "%";
      callback(status);
    })
      .then(async (res) => {
        status.zip_download_finish = true;

        /** 用于计算解压进度 */
        let finish_files = 0;
        /** 本地是否存在用户信息 */
        const zip = await JSZip.loadAsync(res.data);
        const file_names = Object.keys(zip.files);

        // 遍历文件名列表
        for (const fileName of file_names) {
          //节流处理
          await _promiseTimeout(
            async () => {
              const zipEntry = zip.files[fileName];

              // 如果文件不是文件夹且文件名以图片扩展结尾
              if (!zipEntry.dir && fileName.match(reg)) {
                const originalFileName = fileName.replace(reg, "");
                const imgBlob = await zip.files[fileName].async("blob");
                const imgUrl = URL.createObjectURL(imgBlob);
                links[originalFileName] = imgUrl;
                finish_files++;
                status.zip_decompression_progress =
                  Math.round((finish_files / file_names.length) * 100) + "%";
                callback(status);
              }
            },
            type === "BLUR" ? 1 : 25,
          );
        }

        status.zip_decompression_finish = true;
        callback(status);
        resolve(links);
      })
      .catch(reject);
  });
};

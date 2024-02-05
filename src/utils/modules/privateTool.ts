import { Base64 } from "js-base64";
import dayjs from "dayjs";

import { $message } from "./busTransfer";
import { imageOptimizer, saveFiles } from "./tool";

/** @description 选择并压缩头像 */
export const selectAvatarCompress = (e: Event, cb: (v: string) => void) => {
  const file = (e.target as HTMLInputElement).files?.[0];

  if (!file) return;

  if (![".png", ".jpg", ".jpeg"].some((item) => file.name.endsWith(item))) {
    $message("请选择png、jpg、jpeg格式的图片文件！", "error");
    return;
  }

  imageOptimizer({
    file,
    width: 200,
    ratio: 0.75,
    maxSize: 100,
    success: (...data) => {
      cb(data[2]);
    },
    fail() {
      $message("请选择png、jpg、jpeg格式的图片文件！", "error");
    },
  });
};

/** @description 加密数据 */
export const encryption = (data: any) => {
  const encode_data = Base64.encode(JSON.stringify(data));
  const reversed_data = encode_data.split("").reverse().join("");
  return reversed_data;
};

/** @description 解密数据 */
export const decryption = (data: string) => {
  const reversed_data = data.split("").reverse().join("");
  const decode_data = Base64.decode(reversed_data);
  return JSON.parse(decode_data);
};

/** @description 导出卡片 */
export const exportCard = (data: Global.UserData) => {
  saveFiles(encryption(data), `召唤师卡-${dayjs().format("YYYY年MM月DD日hh时mm分ss秒")}.wzry`);
};

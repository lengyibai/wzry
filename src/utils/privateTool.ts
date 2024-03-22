import { Base64 } from "js-base64";

import { $message } from "./busTransfer";
import { _imageOptimizer, _mergeConfig, _saveFiles } from "./tool";

import { DEFAULT, GAME_CONFIG, MESSAGE_TIP } from "@/config";

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

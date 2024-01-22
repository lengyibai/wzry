interface ImportMetaEnv {
  /** 是否打包清除打印及debug */
  VITE_CLEAR_LOG: string;
  /** 远程API地址 */
  VITE_REMOTE_API_URL: string;
  /** 图片版本，当图片大量更新时，修改版本可不使用缓存 */
  VITE_IMAGE_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  /** 是否打包清除打印及debug */
  VITE_CLEAR_LOG: string;
  /** 远程API地址 */
  VITE_REMOTE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

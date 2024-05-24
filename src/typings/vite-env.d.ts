interface ImportMetaEnv {
  /** 是否打包清除打印及debug */
  VITE_CLEAR_LOG: string;
  /** 远程API地址 */
  VITE_DATABASE_URL: string;
  /** 远程静态资源地址 */
  VITE_RESOURCE_URL: string;
  /** 部署地址前缀 */
  VITE_REMOTE_API_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

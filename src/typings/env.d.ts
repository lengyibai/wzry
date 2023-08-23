module "*.vue" {
  import type { DefineComponent } from "vue";
  export default DefineComponent<{}, {}, any>;
}

interface Window {
  /** 图床链接 */
  IMGBED: string;
}

/** 图床链接 */
declare const IMGBED: string;

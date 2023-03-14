module "*.vue" {
  import type { DefineComponent } from "vue";
  export default DefineComponent<{}, {}, any>;
}

type Interval = NodeJS.Timer | number;
type Timeout = NodeJS.Timeout | number;
type Func = () => void;

interface Window {
  /** 图床链接 */
  IMGBED: string;
}

/** 图床链接 */
declare const IMGBED: string;

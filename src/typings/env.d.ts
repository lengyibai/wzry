module "*.vue" {
  import type { DefineComponent } from "vue";
  export default DefineComponent<{}, {}, any>;
}

import { I18nTypeEnum } from "@/language";

module "*.vue" {
  import type { DefineComponent } from "vue";
  export default DefineComponent<{}, {}, any>;
}

declare module "vue-i18n" {
  interface ComponentCustomProperties {}
  interface DefineLocaleMessage extends I18nTypeEnum {}
}

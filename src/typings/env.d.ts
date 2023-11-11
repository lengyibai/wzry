import { I18nTypeEnum } from "@/language";

declare module "vue-i18n" {
  interface ComponentCustomProperties {}
  interface DefineLocaleMessage extends I18nTypeEnum {}
}

import { createI18n } from "vue-i18n";

import zh from "./modules/zh";
import tc from "./modules/tc";
import en from "./modules/en";

import { CONFIG } from "@/config";

const messages: Record<string, Record<string, string>> = {
  zh,
  tc,
  en,
};

const lang = localStorage.getItem(CONFIG.LOCAL_KEY.LANGUAGE);

const i18n = createI18n({
  /** 默认语言 */
  locale: lang || "zh",
  /** 如果要支持 compositionAPI，此项必须设置为 false */
  legacy: false,
  /** 全局注册$t方法 */
  globalInjection: true,
  messages,
});

/** @description 设置语言 */
const setLanguage = (index: 0 | 1 | 2) => {
  const langs = ["zh", "tc", "en"];
  const lang = langs[index];
  i18n.global.setLocaleMessage(lang, messages[lang]);
  i18n.global.locale.value = lang;
  localStorage.setItem(CONFIG.LOCAL_KEY.LANGUAGE, lang);
};

export default i18n;

export { setLanguage };

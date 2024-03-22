/**
 * v-id-encipher
 * id加密，截取中间六位，两边添加三个星号
 */
import type { Directive } from "vue";

const vIdEncipher: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    const str = binding.value;
    el.innerText = `***${str.slice(
      Math.floor(str.length / 2) - 3,
      Math.floor(str.length / 2) + 3,
    )}***`;
  },
};

export { vIdEncipher };

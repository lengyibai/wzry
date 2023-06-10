import { ref } from "vue";

export default () => {
  const show = ref(false); //显示loading
  const text = ref(""); //loading描述

  return {
    /** 显示loading */
    show,
    /** loading描述 */
    text,
  };
};

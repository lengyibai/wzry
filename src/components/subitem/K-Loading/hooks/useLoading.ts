import { ref } from "vue";

export default () => {
  /** 显示loading */
  const show = ref(false);
  /** loading描述 */
  const text = ref("");

  return {
    /** 显示loading */
    show,
    /** loading描述 */
    text,
  };
};

import { ref } from "vue";
export default () => {
  const show_loading = ref(false); //是否显示
  const loading_text = ref(""); //加载描述
  /* 设置方法 */
  const loading = {
    /* 显示 */
    show(text: string) {
      loading_text.value = text;
      show_loading.value = true;
    },
    /* 关闭 */
    close() {
      return new Promise((resolve) => {
        setTimeout(() => {
          show_loading.value = false;
          setTimeout(() => {
            resolve(null);
          }, 250);
        }, 500);
      });
    },
  };

  return {
    loading,
    show_loading,
    loading_text,
  };
};

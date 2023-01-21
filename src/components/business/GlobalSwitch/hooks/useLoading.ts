import { ref } from "vue";

export default () => {
  const show_loading = ref(false); //是否显示
  const loading_text = ref(""); //加载描述

  //设置方法
  const loading: Switch.Loading = {
    //显示
    show(text = "") {
      loading_text.value = text;
      show_loading.value = true;
    },

    //关闭
    close() {
      return new Promise((resolve) => {
        setTimeout(() => {
          show_loading.value = false;
          setTimeout(resolve, 250);
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

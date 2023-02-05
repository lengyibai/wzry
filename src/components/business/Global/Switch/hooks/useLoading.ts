import { ref } from "vue";

export default () => {
  const show_loading = ref(false); //显示loading
  const loading_text = ref(""); //loading描述

  //设置方法
  const loading: Switch.Loading = {
    //显示
    show(text = "正在加载") {
      loading_text.value = text;
      show_loading.value = true;
    },

    //关闭
    close() {
      show_loading.value = false;
    },
  };

  return {
    /** 调用方法 */
    loading,
    /** 显示loading */
    show_loading,
    /** loading描述 */
    loading_text,
  };
};

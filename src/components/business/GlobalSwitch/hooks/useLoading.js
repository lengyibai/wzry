import { ref } from 'vue';

export default (store) => {
  const show_loading = ref(false); //是否显示
  const loading_text = ref(''); //加载描述
  const loading = {
    show(text) {
      loading_text.value = text;
      show_loading.value = true;
    },
    close() {
      return new Promise((resolve) => {
        setTimeout(() => {
          show_loading.value = false;
          setTimeout(() => {
            resolve();
          }, 250);
        }, 500);
      });
    },
  };

  store.$patch({
    $loading: loading,
  });

  return {
    show_loading,
    loading_text,
    loading,
  };
};

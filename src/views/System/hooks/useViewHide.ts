import { ref } from "vue";

export default <T>(emit: (event: "update:modelValue", ...args: any[]) => void, key: string) => {
  const show = ref(false);
  const timer = ref<Interval>();
  const finish = ref(false); //是否发布成功
  const status = ref(0); //发布状态
  const hero_id = ref<number | undefined>(); //英雄id
  const show_ConfirmClose = ref(false); //是否显示确认关闭弹窗
  const form_data = ref<T>();

  /* 判断是否存在草稿 */
  const cache = localStorage.getItem(key);
  if (cache) {
    const data = JSON.parse(cache);
    form_data.value = data.form_data;
    hero_id.value = data.hero_id;
  }
  /* 实时保存为草稿 */
  timer.value = setInterval(() => {
    localStorage.setItem(
      key,
      JSON.stringify({
        hero_id: hero_id.value,
        form_data: form_data.value,
      })
    );
  }, 1000);

  /* 点击关闭显示确认关闭弹窗 */
  const cancel = () => {
    show_ConfirmClose.value = true;
  };

  const close = (status = false) => {
    clearInterval(timer.value);
    show.value = false;
    setTimeout(() => {
      if (!status) {
        localStorage.removeItem(key);
      }
      emit("update:modelValue", false);
    }, 500);
  };
  return {
    show,
    finish,
    status,
    show_ConfirmClose,
    timer,
    form_data,
    hero_id,
    cancel,
    close,
  };
};

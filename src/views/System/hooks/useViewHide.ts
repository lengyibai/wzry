import { ref } from "vue";

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}

export default <T>(emit: Emits, key: string) => {
  const show = ref(false); //是否显示页面
  const timer = ref<Interval>(); //自动保存计时器
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

  /* 取消发布 */
  const EmitCancelRelease = () => {
    show_ConfirmClose.value = true;
  };

  /* 关闭后操作 */
  const close = () => {
    clearInterval(timer.value);
    show.value = false;
    setTimeout(() => {
      emit("update:modelValue", false);
    }, 500);
  };

  /* 关闭前保存 */
  const EmitConfirmSave = () => {
    close();
  };
  /* 关闭后删除 */
  const EmitConfirmRemove = () => {
    localStorage.removeItem(key);
    close();
  };
  return {
    status,
    show,
    show_ConfirmClose,
    form_data,
    finish,
    EmitConfirmSave,
    EmitConfirmRemove,
    EmitCancelRelease,
  };
};

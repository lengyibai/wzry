import { ref } from "vue";

type Emits = (e: "update:modelValue", v: boolean) => void;

const useViewHide = <T>($emit: Emits, key: string) => {
  const ExposeData = {
    /** 显示页面 */
    show: ref(false),
    /** 发布成功 */
    finish: ref(false),
    /** 发布状态 */
    status: ref(0),
    /** 英雄id */
    hero_id: ref<number | undefined>(),
    /** 提交数据 */
    form_data: ref<T>(),
  };
  const { show, hero_id, form_data } = ExposeData;

  /* 判断是否存在草稿 */
  const cache = localStorage.getItem(key);
  if (cache) {
    const data = JSON.parse(cache);
    form_data.value = data.form_data;
    hero_id.value = data.hero_id;
  }

  /* 实时保存为草稿 */
  const timer = setInterval(() => {
    localStorage.setItem(
      key,
      JSON.stringify({
        hero_id: hero_id.value,
        form_data: form_data.value,
      }),
    );
  }, 1000);

  /* 关闭后操作 */
  const close = () => {
    clearInterval(timer);
    show.value = false;
    setTimeout(() => {
      $emit("update:modelValue", false);
    }, 500);
  };

  const ExposeMethods = {
    /** @description 关闭前保存 */
    onConfirmSave() {
      close();
    },

    /** @description 关闭后删除 */
    onConfirmRemove() {
      localStorage.removeItem(key);
      close();
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useViewHide };

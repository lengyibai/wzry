import { watch, Ref, ref } from "vue";

/** @description 模糊加载大图 */
const useBlurImageLoad = (image: Ref<string>, blur: Ref<string>) => {
  /** 背景图 */
  const bg_img = ref("");
  /** 是否已完成加载 */
  const finish = ref(false);

  watch(
    image,
    (v) => {
      finish.value = false;
      bg_img.value = blur.value;
      const img = new Image();
      img.src = v;

      img.onload = () => {
        bg_img.value = v;
        finish.value = true;
      };
    },
    {
      immediate: true,
    },
  );

  return {
    bg_img,
    finish,
  };
};

export { useBlurImageLoad };

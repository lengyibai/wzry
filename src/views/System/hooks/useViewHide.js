import { ref } from 'vue';

export default (emit) => {
  const show = ref(false);
  const finish = ref(false); //是否发布成功
  const status = ref(0); //发布状态

  const close = () => {
    show.value = false;
    setTimeout(() => {
      emit('update:modelValue', false);
    }, 500);
  };

  return {
    show,
    finish,
    status,
    close,
  };
};

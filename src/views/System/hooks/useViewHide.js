import { ref } from 'vue';

export default (emit) => {
  const show = ref(false);
  const finish = ref(false); //是否发布成功

  const close = () => {
    show.value = false;
    setTimeout(() => {
      emit('update:modelValue', false);
    }, 500);
  };

  return {
    show,
    finish,
    close,
  };
};

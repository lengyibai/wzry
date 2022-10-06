<template>
  <div class="K-Checkbox" @click="fn">
    <img class="cursor-pointer" :src="require('@/assets/img/part/checkbox/' + modelValue + '.png')" />
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);
const fn = () => {
  emit('update:modelValue', !props.value);
};
</script>
<style scoped lang="less">
.K-Checkbox {
  width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>

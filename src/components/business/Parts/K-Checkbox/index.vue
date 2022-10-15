<template>
  <div class="K-Checkbox" @click="fn">
    <div class="label" :style="{ width: labelWidth }">
      <span class="text-gradient-one"><i class="star" v-if="required">*</i>{{ label }}： </span>
    </div>
    <img class="cursor-pointer" :src="icon" />
  </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [Boolean, String],
    default: false,
  },
  label: {
    type: String,
    default: '被动',
  },
  labelWidth: {
    type: String,
    default: '150px',
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const icon = computed(() => new URL(`./img/${ props.modelValue }.png`, import.meta.url).href);

const emit = defineEmits(['update:modelValue']);
const fn = () => {
  emit('update:modelValue', !props.modelValue);
};
</script>
<style scoped lang="less">
.K-Checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 35px;

  .label {
    position: relative;
    margin-right: 0.25em;
    color: var(--theme-color-eight);
    text-align: right;
    font-size: 30px;

    span {
      position: relative;

      .star {
        position: absolute;
        left: 0;
        color: var(--theme-color-seven);
        font-size: 20px;
        transform: translateX(-150%);
      }
    }
  }

  img {
    width: 30px;
    height: 30px;
  }
}
</style>

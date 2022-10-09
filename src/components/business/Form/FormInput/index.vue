<template>
  <div class="FormInput" :style="{ width: autoSize && '100%' }">
    <!-- 右侧描述 -->
    <div class="label" :style="{ width: labelWidth }">
      <span class="text-gradient-one"><i class="star" v-if="required">*</i>{{ label }}： </span>
    </div>

    <!-- 输入框 -->
    <div class="input">
      <slot>
        <input
          type="text"
          :style="{ width: autoSize ? '100%' : '250px' }"
          @input="input"
          :value="modelValue"
          :placeholder="placeholder"
          @focus="is_focus = true"
          @blur="blur($event.target.value)"
        />

        <!-- 获取焦点拉长线条 -->
        <transition name="border">
          <div class="focus" v-show="is_focus"></div>
        </transition>

        <!-- 输入不合法拉长线条 -->
        <transition name="border">
          <div class="border" v-show="!legal"></div>
        </transition>

        <!-- 输入不合法提示 -->
        <transition name="tip">
          <div class="tip" v-if="!legal" v-typewriter="tip"></div>
        </transition>
      </slot>
    </div>
  </div>
</template>
<script setup>
import { ref, toRefs } from 'vue';

const props = defineProps({
  /* 值 */
  modelValue: {
    type: String,
    default: '',
  },
  /* 左侧文字 */
  label: {
    type: String,
    default: '标题',
  },
  /* 左侧文字宽度 */
  labelWidth: {
    type: String,
    default: '150px',
  },
  /* 自适应大小 */
  autoSize: {
    type: Boolean,
    default: false,
  },
  /* 输入框描述 */
  placeholder: {
    type: String,
    default: '请输入',
  },
  /* 自定义表单验证 */
  validate: {
    type: Function,
    default: () => true,
  },
  /* 是否必填 */
  required: {
    type: Boolean,
    default: false,
  },
  /* 是否为数字 */
  number: {
    type: Boolean,
    default: false,
  },
});
const { validate, required, number } = toRefs(props);

const tip = ref(''); //不合法提示
const legal = ref(true); //是否合法
const is_focus = ref(false); //是否获取焦点
const blur = (v) => {
  is_focus.value = false;
  legal.value = true;
  if (!validate.value(v)) {
    tip.value = validate.value(v);
    legal.value = false;
  }
  if (required.value && v === '') {
    tip.value = '必填项';
    legal.value = false;
  }
  if (number.value && v && isNaN(v)) {
    tip.value = '限制为数字';
    legal.value = false;
  }
};

const emit = defineEmits(['update:modelValue']);

const input = (e) => {
  emit('update:modelValue', e.target.value);
};
</script>
<style scoped lang="less">
@import './index.less';
</style>

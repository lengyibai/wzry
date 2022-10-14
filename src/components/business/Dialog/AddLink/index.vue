<template>
  <LibMask v-model="modelValue">
    <transition :name="type">
      <div class="AddLink" :style="{ width: width }" v-show="modelValue">
        <div class="title">{{ title }}</div>
        <img
          class="close cursor-pointer"
          v-show="showClose"
          src="@/assets/img/part/icon/close.png"
          @dragstart.prevent
          @click="close"
        />
        <img class="bg" src="@/assets/img/other/dialog.png" />
        <transition name="fade">
          <div class="content" v-if="modelValue">
            <input type="text" ref="input" :placeholder="placeholder" v-model="link" />
            <!-- v-if解决按钮隐式显示，高度却未知，导致粒子无法正常显示 -->
            <K-Button type="warning" @click="confirm">确定</K-Button>
          </div>
        </transition>
      </div>
    </transition>
  </LibMask>
</template>
<script setup>
import {
  nextTick, ref, toRefs, watch,
} from 'vue';

import switchStore from '@/store/globalSwitch';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '50%',
  },
  /* 是否显示右上角关闭按钮 */
  showClose: {
    type: Boolean,
    default: true,
  },
  /* 左上角描述文字(有才会显示) */
  title: {
    type: String,
    default: '更改名字',
  },
  /* 字段名 */
  keyword: {
    type: String,
    default: '',
  },
  /* 输入框描述 */
  placeholder: {
    type: String,
    default: '请输入',
  },
  /* 动画类型 */
  type: {
    type: String,
    default: 'default',
    validator: (value) => {
      return ['default', 'confirm'].indexOf(value) !== -1;
    },
  },
});
const { modelValue } = toRefs(props);

const emit = defineEmits(['update:modelValue', 'get-link']);
const store = switchStore();
const link = ref('');
const input = ref();
const close = () => {
  store.$clickAudio('关闭');
  emit('update:modelValue', false);
};
const confirm = () => {
  close();
  emit('get-link', link.value, props.keyword);
  link.value = '';
};

watch(modelValue, (v) => {
  if (v) {
    nextTick(() => {
      input.value.focus();
    });
  }
});
</script>
<style scoped lang="less">
@import './index.less';
</style>

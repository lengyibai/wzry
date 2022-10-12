<template>
  <LibMask v-model="modelValue">
    <transition name="confirm">
      <div class="ConfirmClose" :style="{ width: '750px' }" v-show="modelValue">
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
            <div class="text">{{ text }}</div>
            <div class="button">
              <K-Button type="info" @click="confirm(false)">取消</K-Button>
              <K-Button class="last" type="warning" @click="confirm(true)">确定</K-Button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </LibMask>
</template>
<script setup>
import { toRefs } from 'vue';

import switchStore from '@/store/globalSwitch.js';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
  /* 是否显示右上角关闭按钮 */
  showClose: {
    type: Boolean,
    default: true,
  },
  /* 左上角描述文字 */
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '即将关闭，是否保存为草稿？',
  },
});
const { modelValue } = toRefs(props);

const emit = defineEmits(['update:modelValue', 'close']);
const store = switchStore();
const close = () => {
  store.$clickAudio('关闭');
  emit('update:modelValue', false);
};
const confirm = (status) => {
  emit('close', status);
  close();
};
</script>
<style scoped lang="less">
@import './index.less';
</style>

<template>
  <LibMask v-model="modelValue">
    <transition :name="type">
      <div class="ConfirmNotice" :style="{ width: width }" v-show="modelValue">
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
            <div class="desc">
              <div class="title">
                <div class="label">标题</div>
                <div class="text">即将关闭添加页</div>
              </div>
              <div class="content">
                <div class="label">内容</div>
                <div class="text">即将关闭添加页，是否保存为草稿</div>
              </div>
            </div>
            <div class="button">
              <K-Button type="info" @click="confirm">取消</K-Button>
              <K-Button class="last" type="warning" @click="confirm">确定</K-Button>
            </div>
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

import switchStore from '@/store/globalSwitch.js';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '60%',
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

const emit = defineEmits(['update:modelValue', 'close']);
const store = switchStore();
const link = ref('');
const input = ref();
const close = () => {
  store.$clickAudio('关闭');
  emit('update:modelValue', false);
};
const confirm = () => {
  close();
  emit('close', link.value, props.keyword);
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

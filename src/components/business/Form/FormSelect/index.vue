<template>
  <div class="FormSelect">
    <!-- 左侧描述 -->
    <div class="label">
      <span><i class="star" v-if="required">*</i>{{ label }}：</span>
    </div>

    <div class="select">
      <!-- 选择器框 -->
      <div class="select-box cursor-pointer" ref="selectBox">
        <input
          type="text"
          ref="input"
          @input="debounce"
          @focus="focus"
          @blur="blur($event.target.value)"
          v-model="modelValue"
          :placeholder="active_value || '搜索'"
        />

        <!-- 获取焦点拉长线条 -->
        <transition name="border">
          <div class="focus" v-show="is_unfold"></div>
        </transition>

        <!-- 输入不合法拉长线条 -->
        <transition name="border">
          <div class="border" v-show="no_legal"></div>
        </transition>

        <!-- 输入不合法提示 -->
        <transition name="tip">
          <div class="tip" v-if="no_legal" v-typewriter="'必选项'"></div>
        </transition>
        <img class="arrow" :class="{ rotate: is_unfold }" src="@/assets/img/part/icon/arrow.png" alt="" />
      </div>

      <!-- 展开列表 -->
      <div class="select-list" :class="{ unfold: !is_unfold }">
        <transition-group name="selectList">
          <div
            class="box"
            :class="{ active: currentIndex === index || modelValue === item.name || modelValue === item.id }"
            v-for="(item, index) in select_list"
            @click="select(item.id, item.name)"
            @mouseenter="currentIndex = index"
            @mouseleave="currentIndex = null"
            :key="item.id"
          >
            <div class="item cursor-pointer">{{ item.name }}</div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  onBeforeUnmount, ref, toRefs, watch,
} from 'vue';
import { $search, $debounce } from '@/utils/index.js';
//#####··········图标··········#####//

import $bus from '@/utils/eventBus.js';

const props = defineProps({
  /* 传递id还是name */
  id: {
    type: Boolean,
    default: false,
  },
  /* 数据 */
  data: {
    type: Array,
    default() {
      return [];
    },
  },
  /* 选择的值 */
  modelValue: {
    type: [String, Number],
  },
  /* 是否必填 */
  required: {
    type: Boolean,
    default: false,
  },
  /* 左侧文字 */
  label: {
    type: String,
    default: '标题',
  },
  keyword: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number],
    default: '',
  },
});
const {
  modelValue, data, required, value,
} = toRefs(props);

const emit = defineEmits(['change', 'update:modelValue']);

const active_value = ref(''); //选中的值
const no_legal = ref(false); //是否合法
const is_unfold = ref(false); //是否展开
const currentIndex = ref(null); //当前点击
const select_list = ref([]); //下拉列表

/* 防抖 */
const debounce = $debounce(() => {
  select_list.value = $search(data.value, modelValue.value, ['name']);
}, 100);

/* 获取焦点 */
const focus = () => {
  is_unfold.value = true;
  emit('update:modelValue', '');
};

/* 失去焦点 */
const blur = () => {
  setTimeout(() => {
    no_legal.value = required.value && active_value.value === '';
    select_list.value = data.value;
  }, 100);
};

/* 选择的数据 */
const select = (id, name) => {
  emit('update:modelValue', props.id ? id : name);
  emit('change', props.id ? id : name);
  is_unfold.value = false;
  select_list.value = data.value;
  active_value.value = name;
};

/* 点击空白隐藏列表 */
const input = ref();
const selectBox = ref();
const hideList = (e) => {
  if (e.target === selectBox.value || e.target === input.value) {
    return;
  }
  is_unfold.value = false;
  // 如果失去焦点但输入框的值与之前选中的值不一致，则还原之前
  if (modelValue.value !== active_value.value) {
    emit('update:modelValue', active_value.value);
  }
};
$bus.on('click', (v) => {
  hideList(v);
});

/* 在created会赋空值，只能通过侦听器 */
watch(
  data,
  (v) => {
    select_list.value = v;
  },
  { immediate: true },
);

watch(value, (v) => {
  active_value.value = v;
});

onBeforeUnmount(() => {
  $bus.off('click'); //关闭监听
});
</script>
<style scoped lang="less">
@import './index.less';
</style>

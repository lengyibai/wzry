<template>
  <div class="FormSelect" :class="{ disabled: disabled }">
    <!-- 左侧描述 -->
    <div class="label">
      <span><i class="star" v-if="required">*</i>{{ label }}：</span>
    </div>

    <div class="select" :style="{ width: autoSize ? '100%' : '250px' }">
      <!-- 选择器框 -->
      <div class="select-box cursor-pointer" ref="selectBox">
        <input
          type="text"
          ref="input"
          @input="debounce"
          @focus="focus"
          @blur="blur($event.target.value)"
          v-model="input_value"
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
  /* 自适应大小 */
  autoSize: {
    type: Boolean,
    default: false,
  },
  /* 选择的值 */
  modelValue: {
    type: [String, Number],
  },
  /* 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
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

const input_value = ref(''); //输入框的值
const active_value = ref(''); //选中的值
const no_legal = ref(false); //是否合法
const is_unfold = ref(false); //是否展开
const currentIndex = ref(null); //当前点击
const select_list = ref([]); //下拉列表

/* 防抖 */
const debounce = $debounce(() => {
  select_list.value = $search(data.value, input_value.value, ['name']);
}, 100);

/* 获取焦点 */
const focus = () => {
  is_unfold.value = true;
  input_value.value = '';
};

/* 失去焦点 */
const blur = () => {
  setTimeout(() => {
    no_legal.value = required.value && active_value.value === '';
    select_list.value = data.value;
    // 如果失去焦点但输入框的值与之前选中的值不一致，则还原之前
    if (input_value.value !== active_value.value) {
      input_value.value = active_value.value;
    }
  }, 100);
};

/* 选择的数据 */
const select = (id, name) => {
  emit('update:modelValue', props.id ? id : name);
  emit('change', props.id ? id : name);
  is_unfold.value = false;
  select_list.value = data.value;
  active_value.value = name;
  input_value.value = name;
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
  if (input_value.value !== active_value.value) {
    input_value.value = active_value.value;
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

watch(
  value,
  (v) => {
    active_value.value = v;
    input_value.value = v;
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  $bus.off('click'); //关闭监听
});
</script>
<style scoped lang="less">
.FormSelect {
  display: flex;
  align-items: center;
  margin-bottom: 35px;
  .label {
    position: relative;
    margin-right: 0.25em;
    width: 150px;
    color: var(--theme-color-eight);
    text-align: right;
    span {
      position: relative;
      background: linear-gradient(115deg, #4d6b8f 0%, #8097bb 89%);
      -webkit-background-clip: text;
      color: transparent;
      font-size: 30px;
      .star {
        position: absolute;
        left: 0;
        color: var(--theme-color-seven);
        font-size: 20px;
        transform: translateX(-150%);
      }
    }
  }
  .select {
    position: relative;
    .select-box {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px;
      border-bottom: 1px solid var(--theme-color-nine);
      input {
        width: 100%;
        outline: none;
        border: none;
        background-color: transparent;
        color: var(--theme-color-five);
        font-size: 26px;
      }
      .border,
      .focus {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: var(--red);
        transition: all 0.5s;
        transform: translateY(1px);
      }
      .focus {
        background-color: var(--theme-color-four);
      }
      .tip {
        position: absolute;
        bottom: 0;
        overflow: hidden;
        height: 16px;
        color: var(--red);
        font-size: 16px;
        transform: translateY(125%);
        transform-origin: center top;
      }
      .arrow {
        width: 25px;
        transition: all 0.25s;
        transform: rotate(0deg);
        pointer-events: none;
      }
    }
    .select-list {
      position: absolute;
      bottom: -15px;
      z-index: 1;
      overflow: auto;
      width: 100%;
      height: 300px;
      border: 1px solid var(--theme-color-four);
      border-radius: 5px;
      background-color: var(--black);
      transition: all 0.25s;
      transform: translateY(100%);
      transform-origin: top center;

      overscroll-behavior: contain;
      .box {
        padding: 20px;
        background-color: rgba(0, 0, 0, 0.39);
        color: var(--theme-color-nine);
        .item {
          font-size: 26px;
          transition: all 0.25s;
        }
      }
    }
  }
}
.rotate {
  transform: rotate(180deg) !important;
}

.unfold {
  opacity: 0;
  transform: translateY(100%) scaleY(0) !important;
}

.active {
  background-color: rgba(35, 60, 91, 0.5) !important;
  color: var(--theme-color-four) !important;
  .item {
    transform: translateX(10px);
  }
}

.disabled {
  opacity: 0.4;
  pointer-events: none;
}
</style>

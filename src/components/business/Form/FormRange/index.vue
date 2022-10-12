<template>
  <div class="FormInput" :class="{ disabled: disabled }">
    <!-- 右侧描述 -->
    <div class="label" :style="{ width: labelWidth }">
      <span class="text-gradient-one"><i class="star" v-if="required">*</i>{{ label }}： </span>
    </div>

    <!-- 输入框 -->
    <div class="input" :style="{ width: width }">
      <div class="sliderValue" v-if="showNum">
        <span :class="{ showNum: show_num }" :style="{ left: barWidth }">
          {{ text || modelValue }}
        </span>
      </div>
      <div class="field">
        <div class="bar" :style="{ width: barWidth, backgroundColor: color }">
          <img :src="icon" v-show="showIcon && showDot" :style="{ width: size + 'px', height: size + 'px' }" />
          <span
            v-show="showDot && !showIcon"
            :style="{
              width: size + 'px',
              height: size + 'px',
              backgroundColor: color,
            }"
          ></span>
        </div>
        <input
          :value="modelValue"
          @input="changeValue($event.target.value)"
          @mouseup="hide"
          type="range"
          :min="min"
          :max="max"
          :step="step"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ref, toRefs, onMounted, computed,
} from 'vue';

const props = defineProps({
  /* 值 */
  modelValue: {
    type: Number,
    default: 0,
  },
  width: {
    type: String,
    default: '200px',
  },
  /* 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
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
  /* 是否必填 */
  required: {
    type: Boolean,
    default: false,
  },
  /* 最小值 */
  min: {
    type: Number,
    default: 0,
  },
  /* 最大值 */
  max: {
    type: Number,
    default: 100,
  },
  /* 进度条自定义悬浮文本 */
  text: {
    type: String,
    default: '',
  },
  /* 进度条颜色 */
  color: {
    type: String,
    default: '#3498db',
  },
  /* 圆点和图标大小，实际上可点击的范围依然是20px * 20px */
  size: {
    type: Number,
    default: 35,
  },
  /* 是否显示圆点，也决定是否显示图标 */
  showDot: {
    type: Boolean,
    default: true,
  },
  /* 是否显示图标 */
  showIcon: {
    type: Boolean,
    default: true,
  },
  /* 自定义图标1:1 */
  icon: {
    type: String,
    default: new URL('./img/icon.png', import.meta.url).href,
  },
  /* 是否在滑动的时候显示数字 */
  showNum: {
    type: Boolean,
    default: true,
  },
  /* 步长 */
  step: {
    type: Number,
    default: 1,
  },
});
const {
  modelValue, max, min, size, showDot,
} = toRefs(props);

const rotate = ref(0);
const show_num = ref(false);

const barWidth = computed(() => {
  const value = modelValue.value - min.value;
  const maxs = max.value - min.value;
  return `calc(${value / (maxs / 100)}% + ${((size.value - (showDot.value ? 0 : 25)) * (maxs / 2 - value)) / maxs}px)`;
});

onMounted(() => {
  const root = document.querySelector(':root');
  root.style.setProperty('--size', `${size.value}px`);
});

const emit = defineEmits(['update:modelValue']);
const changeValue = (v) => {
  show_num.value = true;
  emit('update:modelValue', parseFloat(v));
  rotate.value = v / max.value;
};
const hide = () => {
  show_num.value = false;
};
</script>
<style scoped lang="less">
.FormInput {
  display: flex;
  align-items: center;
  margin-bottom: 35px;
  .label {
    position: relative;
    margin-right: 0.25em;
    color: var(--theme-color-eight);
    text-align: right;
    span {
      position: relative;
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
  .input {
    position: relative;
    .sliderValue {
      position: absolute;
      width: 100%;
      top: -75px;
      span {
        position: absolute;
        padding: 0 15px;
        border-radius: 30px;
        height: 50px;
        font-size: 25px;
        font-weight: 500;
        color: var(--theme-color-eight);
        background-color: var(--theme-color-two);
        text-align: center;
        transform: translateX(-50%) scale(0);
        transform-origin: bottom;
        transition: transform 0.3s ease-in-out;
        line-height: 50px;
        z-index: 2;
      }
    }
    .field {
      @height: 3px;
      display: flex;
      justify-content: center;
      .bar {
        position: absolute;
        left: 0;
        width: 0%;
        height: @height;
        border-radius: @height;
        pointer-events: none;
        background-image: linear-gradient(90deg, #2d59a0 0%, #6bb8ff 100%);

        img,
        span {
          position: absolute;
          transform: translateX(50%) translateY(-50%);
          top: 1.5px;
          right: 0;
          border-radius: 50%;
          transition: transform 0.5s;
        }
      }
      input {
        appearance: none;
        width: 100%;
        height: @height;
        border-radius: @height;
        margin: 0;
        background-color: var(--theme-color-nine);
        outline: none;
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: var(--size);
          height: var(--size);
          background-size: cover;
          border-radius: 50px;
          cursor: pointer;
        }
      }
      .value {
        position: relative;
        font-size: 18px;
        font-weight: 600;
        color: #000;
        &.left {
          left: -22px;
        }
        &.right {
          right: -43px;
        }
      }
    }
  }
}

/* 拖动显示数字 */
.showNum {
  transform: translateX(-50%) scale(1) !important;
}

.disabled {
  opacity: 0.4;
  pointer-events: none;
}
</style>

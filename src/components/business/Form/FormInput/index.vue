<template>
  <div class="FormInput" :class="{ disabled: disabled }" :style="autoStyle">
    <!-- 右侧描述 -->
    <div class="label" :style="{ minWidth: labelWidth }">
      <span class="text-gradient-one"><i class="star" v-if="required">*</i>{{ label }}： </span>
    </div>

    <!-- 输入框 -->
    <div class="input" :style="{ width: autoSize ? '100%' : '250px' }">
      <slot>
        <input
          type="text"
          @input="input"
          :value="modelValue === 0 ? '' : modelValue"
          :placeholder="placeholder"
          @focus="is_focus = true"
          @blur="blur"
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
<script setup lang="ts">
import { ref, StyleValue, toRefs } from "vue";

interface Props {
  modelValue: number | string; //值
  disabled?: boolean; //是否禁用
  label: string; //左侧文字
  labelWidth?: string; //左侧文字宽度
  autoSize?: boolean; //自适应大小
  placeholder?: string; //输入框描述
  validate?: (val: string) => string; //自定义表单验证
  required?: boolean; //是否必填
  number?: boolean; //是否为数字
}
interface Emits {
  (e: "update:modelValue", v: string | number): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  disabled: false,
  label: "标题",
  labelWidth: "150px",
  autoSize: false,
  placeholder: "请输入",
  validate: () => "",
  required: false,
  number: false,
});
const emit = defineEmits<Emits>();

const { validate, required, number, autoSize } = toRefs(props);
const autoStyle: StyleValue = props.autoSize ? { width: "100%" } : {};

const tip = ref(""); //不合法提示
const legal = ref(true); //是否合法
const is_focus = ref(false); //是否获取焦点

/* 失去焦点 */
const blur = (e: Event) => {
  const v = (e.target as HTMLInputElement).value;
  is_focus.value = false;
  legal.value = true;
  setTimeout(() => {
    if (validate.value(v)) {
      tip.value = validate.value(v);
      legal.value = false;
    }

    if (required.value && v === "") {
      tip.value = "必填项";
      legal.value = false;
    }
    if (number.value && v && isNaN(Number(v))) {
      tip.value = "限制为数字";
      legal.value = false;
    }
  });
};

const input = (e: Event) => {
  const v = (e.target as HTMLInputElement).value;
  emit("update:modelValue", number.value ? (isNaN(Number(v)) ? v : Number(v)) : v);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
